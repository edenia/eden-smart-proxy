#include <numeric>

#include <admin.hpp>
#include <communities.hpp>
#include <constants.hpp>
#include <smartproxy.hpp>
#include <voters.hpp>

#include <members.cpp>
#include <myvoteeosdao/myvoteeosdao.hpp>

namespace edenproxy {
  void voters::member_vote( eosio::name                       voter,
                            const std::vector< eosio::name > &producers ) {
    eden::members members{ EDEN_ACCOUNT };
    const auto   &member = members.get_member( voter );

    eosio::check( member.status() == eden::member_status::active_member,
                  "You need to be an active eden member to vote" );

    eosio::check( producers.size() >= 1 && producers.size() <= 30,
                  "You can not vote for more than 30 BPs." );

    eosio::check(
        dao::myvoteeosdao::checkbp( DAO_ACCOUNT, DAO_ACCOUNT, producers[0] ),
        "You may only vote for whitelisted BPs." );
    eosio::check( !admin{ contract }.is_blacklisted( producers[0] ),
                  "The BP " + producers[0].to_string() + " is blacklisted" );

    for ( size_t i = 1; i < producers.size(); ++i ) {
      eosio::check( producers[i - 1] < producers[i],
                    "Block Producer votes must be unique and sorted." );
      eosio::check(
          dao::myvoteeosdao::checkbp( DAO_ACCOUNT, DAO_ACCOUNT, producers[i] ),
          "Only whitelisted BPs are allowed" );
      eosio::check( !admin{ contract }.is_blacklisted( producers[i] ),
                    "The BP " + producers[i].to_string() + " is blacklisted" );
    }

    std::vector< uint16_t > ranks = members.stats().ranks;
    uint16_t is_election_completed = ranks.size() >= 3 && ranks.back() == 1;
    uint8_t  member_rank = member.election_rank();
    bool     is_hd = member_rank == ranks.size() - 1 && is_election_completed;
    uint8_t  rank_factor = is_hd ? 1 : 0;
    uint16_t vote_weight =
        calculate_vote_weight( member_rank - rank_factor, ranks );

    on_vote( vote_weight, voter, producers );
  }

  void voters::on_rmvote( eosio::name voter ) {
    auto votes_itr = voter_tb.find( voter.value );

    eosio::check( votes_itr != voter_tb.end(), "Vote does not exist" );

    on_remove_vote( votes_itr->producers(), votes_itr->weight() );

    voter_tb.erase( votes_itr );
  }

  void voters::on_proxyvote() {
    std::vector< std::pair< eosio::name, uint16_t > > bps;

    for ( auto itr = score_tb.begin(); itr != score_tb.end(); itr++ ) {
      if ( is_active_bp( itr->bp() ) &&
           !admin{ contract }.is_blacklisted( itr->bp() ) ) {
        bps.push_back( std::pair{ itr->bp(), itr->weight() } );
      }
    }

    eosio::check( bps.size() >= 1, "No BPs to vote for" );

    std::sort( bps.begin(),
               bps.end(),
               []( std::pair< eosio::name, uint16_t > a,
                   std::pair< eosio::name, uint16_t > b ) {
                 return a.second > b.second;
               } );

    int                        edge = bps.size() <= 30 ? bps.size() : 30;
    std::vector< eosio::name > bps_to_vote;

    for ( auto bp_itr = bps.begin(); bp_itr < bps.begin() + edge; ++bp_itr ) {
      bps_to_vote.push_back( bp_itr->first );
    }

    std::sort( bps_to_vote.begin(), bps_to_vote.end() );

    eosio::action{ { contract, "active"_n },
                   "eosio"_n,
                   "voteproducer"_n,
                   std::tuple( contract, eosio::name{}, bps_to_vote ) }
        .send();
  }

  uint32_t voters::on_refreshvotes( uint32_t max_steps ) {
    admin                   admin{ contract };
    auto                   *state = admin.get_update_state();
    eden::members           members{ EDEN_ACCOUNT };
    std::vector< uint16_t > ranks = members.stats().ranks;
    uint16_t is_election_completed = ranks.size() >= 3 && ranks.back() == 1;

    auto voter_itr = ++voter_tb.find( state->last_voter.value );

    for ( ; voter_itr != voter_tb.end() && max_steps > 0; --max_steps ) {
      const auto &member = members.get_member( voter_itr->account() );

      if ( member.status() == eden::member_status::pending_membership ) {
        on_remove_vote( voter_itr->producers(), voter_itr->weight() );
        voter_itr = voter_tb.erase( voter_itr );
      } else {
        uint8_t member_rank = member.election_rank();
        bool is_hd = member_rank == ranks.size() - 1 && is_election_completed;
        uint8_t  rank_factor = is_hd ? 1 : 0;
        uint16_t vote_weight =
            calculate_vote_weight( member_rank - rank_factor, ranks );

        if ( voter_itr->weight() != vote_weight ) {
          on_vote( vote_weight, voter_itr->account(), voter_itr->producers() );
        }

        ++voter_itr;
      }
    }

    // TODO: pass to next community until there is not community left
    if ( voter_itr == voter_tb.end() ) {
      communities communities{ contract };
      eosio::name next_community =
          communities.get_next_community( state->current_community );

      if ( next_community != eosio::name{} ) {
        admin.set_next_community( next_community );
      }
    }

    return max_steps;
  }

  void voters::on_vote( uint16_t                          vote_weight,
                        eosio::name                       voter,
                        const std::vector< eosio::name > &producers ) {
    eden::members              members{ EDEN_ACCOUNT };
    uint16_t                   old_vote_weight = 0;
    std::vector< eosio::name > current_producers;
    std::vector< eosio::name > new_producers = producers;
    std::vector< eosio::name > old_producers;

    auto votes_itr = voter_tb.find( voter.value );

    if ( votes_itr == voter_tb.end() ) {
      voter_tb.emplace( contract, [&]( auto &row ) {
        row.account() = voter;
        row.producers() = producers;
        row.weight() = vote_weight;
      } );
    } else {
      old_producers = votes_itr->producers();
      old_vote_weight = votes_itr->weight();

      voter_tb.modify( votes_itr, eosio::same_payer, [&]( auto &row ) {
        row.producers() = producers;
        row.weight() = vote_weight;
      } );
    }

    for ( auto bp_itr = old_producers.begin(); bp_itr < old_producers.end();
          bp_itr++ ) {
      if ( std::any_of(
               new_producers.begin(),
               new_producers.end(),
               [&]( eosio::name temp_bp ) { return temp_bp == *bp_itr; } ) ) {
        std::erase( new_producers, *bp_itr );
        current_producers.push_back( *bp_itr );
        bp_itr = old_producers.erase( bp_itr );
      }
    }

    // remove bp weight
    for ( eosio::name bp : old_producers ) {
      auto stats_itr = score_tb.find( bp.value );

      if ( stats_itr->weight() - old_vote_weight <= 0 ) {
        score_tb.erase( stats_itr );
      } else {
        score_tb.modify( stats_itr, eosio::same_payer, [&]( auto &row ) {
          row.weight() -= old_vote_weight;
        } );
      }
    }

    // add new bp weight
    for ( eosio::name bp : new_producers ) {
      auto stats_itr = score_tb.find( bp.value );

      if ( stats_itr == score_tb.end() ) {
        score_tb.emplace( contract, [&]( auto &row ) {
          // the voter could have increased his rank
          row.bp() = bp;
          row.weight() = vote_weight;
        } );
      } else {
        score_tb.modify( stats_itr, eosio::same_payer, [&]( auto &row ) {
          row.weight() += vote_weight;
        } );
      }
    }

    // update bp weight
    for ( eosio::name bp : current_producers ) {
      auto stats_itr = score_tb.find( bp.value );

      if ( stats_itr->weight() + ( vote_weight - old_vote_weight ) <= 0 ) {
        score_tb.erase( stats_itr );
      } else {
        score_tb.modify( stats_itr, eosio::same_payer, [&]( auto &row ) {
          // the voter could have increased his rank
          row.weight() += vote_weight - old_vote_weight;
        } );
      }
    }
  }

  void voters::on_remove_vote( std::vector< eosio::name > producers,
                               uint16_t                   weight ) {
    for ( eosio::name bp : producers ) {
      auto score_itr = score_tb.find( bp.value );

      if ( score_itr->weight() - weight <= 0 ) {
        score_tb.erase( score_itr );
      } else {
        score_tb.modify( score_itr, eosio::same_payer, [&]( auto &row ) {
          row.weight() -= weight;
        } );
      }
    }
  }

  uint16_t
  voters::calculate_vote_weight( uint16_t                 rank,
                                 std::vector< uint16_t > &stat_ranks ) {
    if ( rank == 0 ) {
      return 1;
    }

    uint64_t total_participating_members =
        std::accumulate( stat_ranks.begin(), stat_ranks.end(), 0 );
    uint64_t member_ranks =
        std::accumulate( stat_ranks.begin() + rank, stat_ranks.end(), 0 );

    return total_participating_members / member_ranks;
  }

  uint32_t voters::remove_community_votes( uint32_t max_steps ) {
    // This function is focus on get_self scope ONLY, DO NOT use it for any other scope
    for ( auto itr = voter_tb.begin(); itr != voter_tb.end() && max_steps > 0;
          --max_steps ) {
      for ( auto bp : itr->producers() ) {
        auto bp_itr = score_tb.find( bp.value );

        if ( bp_itr->weight() - itr->weight() > 1 ) {
          score_tb.erase( bp_itr );
        } else {
          score_tb.modify( bp_itr, eosio::same_payer, [&]( auto &row ) {
            row.weight() -= itr->weight();
          } );
        }
      }

      itr = voter_tb.erase( itr );
    }

    return max_steps;
  }

  uint32_t voters::remove_community( uint32_t max_steps ) {
    for ( auto itr = voter_tb.begin(); itr != voter_tb.end() && max_steps > 0;
          --max_steps ) {
      itr = voter_tb.erase( itr );
    }

    if ( max_steps == 0 ) {
      return max_steps;
    }

    for ( auto itr = score_tb.begin(); itr != score_tb.end() && max_steps > 0;
          --max_steps ) {
      itr = score_tb.erase( itr );
    }

    return max_steps;
  }

  // void clear_all();
} // namespace edenproxy