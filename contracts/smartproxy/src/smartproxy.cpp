#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>

#include <members.cpp>
#include <myvoteeosdao/myvoteeosdao.hpp>

#include <smartproxy.hpp>

namespace edenproxy {
  void
  smartproxy_contract::vote( eosio::name                       voter,
                             const std::vector< eosio::name > &producers ) {
    require_auth( voter );

    eosio::check( producers.size() >= 1 && producers.size() <= 30,
                  "No more than 30 bps are allowed to vote for" );

    eden::members members{ EDEN_ACCOUNT };
    const auto   &member = members.get_member( voter );

    eosio::check( member.status() == eden::member_status::active_member,
                  "Needs to be an active eden member" );
    eosio::check(
        dao::myvoteeosdao::checkbp( DAO_ACCOUNT, DAO_ACCOUNT, producers[0] ),
        "Only whitelisted bps are allowed" );
    eosio::check( !is_blacklisted( producers[0] ),
                  "The bp " + producers[0].to_string() + " is blacklisted" );

    for ( size_t i = 1; i < producers.size(); ++i ) {
      eosio::check( producers[i - 1] < producers[i],
                    "Producer votes must be unique and sorted" );
      eosio::check(
          dao::myvoteeosdao::checkbp( DAO_ACCOUNT, DAO_ACCOUNT, producers[i] ),
          "Only whitelisted bps are allowed" );
      eosio::check( !is_blacklisted( producers[i] ),
                    "The bp " + producers[i].to_string() + " is blacklisted" );
    }

    std::vector< uint16_t > ranks = members.stats().ranks;
    uint16_t is_election_completed = ranks.size() >= 3 && ranks.back() == 1;
    uint8_t  member_rank = member.election_rank();
    bool     is_hd = member_rank == ranks.size() - 1 && is_election_completed;
    uint8_t  rank_factor = is_hd ? 1 : 0;
    uint16_t vote_weight = calculate_vote_weight( member_rank - rank_factor );

    on_vote( vote_weight, voter, producers );
  }

  void smartproxy_contract::rmvote( eosio::name voter ) {
    require_auth( voter );

    votes_table _votes{ get_self(), get_self().value };
    auto        votes_itr = _votes.find( voter.value );

    eosio::check( votes_itr != _votes.end(), "Vote does not exist" );

    on_remove_vote( votes_itr->producers, votes_itr->weight );

    _votes.erase( votes_itr );
  }

  void smartproxy_contract::proxyvote() {
    require_auth( get_self() );

    std::vector< std::pair< eosio::name, uint16_t > > bps;

    stats_table _stats{ get_self(), get_self().value };

    for ( auto itr = _stats.begin(); itr != _stats.end(); itr++ ) {
      if ( is_active_bp( itr->bp ) && !is_blacklisted( itr->bp ) ) {
        bps.push_back( std::pair{ itr->bp, itr->weight } );
      }
    }

    eosio::check( bps.size() >= 1, "No bps to vote for" );

    std::sort( bps.begin(),
               bps.end(),
               []( std::pair< eosio::name, uint16_t > a,
                   std::pair< eosio::name, uint16_t > b ) {
                 return a.second > b.second;
               } );

    int edge = bps.size() <= 30 ? bps.size() : 30;
    std::vector< std::pair< eosio::name, uint16_t > > final_bps( bps.begin(),
                                                                 bps.begin() +
                                                                     edge );

    std::sort( final_bps.begin(),
               final_bps.end(),
               []( std::pair< eosio::name, uint16_t > a,
                   std::pair< eosio::name, uint16_t > b ) {
                 return a.first < b.first;
               } );

    std::vector< eosio::name > sorted_bps;

    for ( auto bp : bps ) {
      sorted_bps.push_back( bp.first );
    }

    eosio::action{ { get_self(), "active"_n },
                   "eosio"_n,
                   "voteproducer"_n,
                   std::tuple( get_self(), eosio::name{}, sorted_bps ) }
        .send();
  }

  void smartproxy_contract::refreshvotes( uint32_t max_steps, bool flag ) {
    require_auth( get_self() );

    votes_table _votes{ get_self(), get_self().value };

    eden::members members{ EDEN_ACCOUNT };

    std::vector< uint16_t > ranks = members.stats().ranks;
    uint16_t is_election_completed = ranks.size() >= 3 && ranks.back() == 1;

    auto votes_secidx = _votes.get_index< "byflag"_n >();
    auto votes_itr =
        votes_secidx.lower_bound( static_cast< uint64_t >( flag ) );
    auto end = votes_secidx.upper_bound( static_cast< uint64_t >( flag ) );

    check( votes_itr != end, "Nothing to do" );

    for ( ; votes_itr != end && max_steps > 0; --max_steps ) {
      const auto &member = members.get_member( votes_itr->account );

      if ( member.status() == eden::member_status::pending_membership ) {
        on_remove_vote( votes_itr->producers, votes_itr->weight );
        votes_itr = votes_secidx.erase( votes_itr );
      } else {
        uint8_t member_rank = member.election_rank();
        bool is_hd = member_rank == ranks.size() - 1 && is_election_completed;
        uint8_t  rank_factor = is_hd ? 1 : 0;
        uint16_t vote_weight =
            calculate_vote_weight( member_rank - rank_factor );

        if ( votes_itr->weight != vote_weight ) {
          on_vote( vote_weight, votes_itr->account, votes_itr->producers );
        }

        votes_secidx.modify( votes_itr, eosio::same_payer, [&]( auto &row ) {
          row.flag = static_cast< uint64_t >( !flag );
        } );
      }

      votes_itr = votes_secidx.lower_bound( static_cast< uint64_t >( flag ) );
    }
  }

  void smartproxy_contract::banbp( eosio::name bp ) {
    require_auth( get_self() );

    eosio::check( is_blockproducer( bp ), "Only blockproducers can be banned" );

    blacklisted_table _blacklisted( get_self(), get_self().value );

    auto blacklisted_itr = _blacklisted.find( bp.value );

    eosio::check( blacklisted_itr == _blacklisted.end(),
                  "bp is already blacklisted" );

    _blacklisted.emplace( get_self(), [&]( auto &row ) { row.bp = bp; } );
  }

  void smartproxy_contract::unbanbp( eosio::name bp ) {
    require_auth( get_self() );

    blacklisted_table _blacklisted( get_self(), get_self().value );

    auto blacklisted_itr = _blacklisted.find( bp.value );

    eosio::check( blacklisted_itr != _blacklisted.end(),
                  "bp is not blacklisted" );

    _blacklisted.erase( blacklisted_itr );
  }

  void smartproxy_contract::clearall() {
    votes_table _votes{ get_self(), get_self().value };

    for ( auto itr = _votes.begin(); itr != _votes.end(); ) {
      itr = _votes.erase( itr );
    }

    stats_table _stats{ get_self(), get_self().value };

    for ( auto itr = _stats.begin(); itr != _stats.end(); ) {
      itr = _stats.erase( itr );
    }

    blacklisted_table _blacklisted{ get_self(), get_self().value };

    for ( auto itr = _blacklisted.begin(); itr != _blacklisted.end(); ) {
      itr = _blacklisted.erase( itr );
    }
  }

  void
  smartproxy_contract::on_vote( uint16_t                          vote_weight,
                                eosio::name                       voter,
                                const std::vector< eosio::name > &producers ) {
    eden::members              members{ EDEN_ACCOUNT };
    uint16_t                   old_vote_weight = 0;
    std::vector< eosio::name > current_producers;
    std::vector< eosio::name > new_producers = producers;
    std::vector< eosio::name > old_producers;

    votes_table _votes{ get_self(), get_self().value };
    auto        votes_itr = _votes.find( voter.value );

    if ( votes_itr == _votes.end() ) {
      _votes.emplace( get_self(), [&]( auto &row ) {
        row.account = voter;
        row.producers = producers;
        row.weight = vote_weight;
      } );
    } else {
      old_producers = votes_itr->producers;
      old_vote_weight = votes_itr->weight;

      _votes.modify( votes_itr, eosio::same_payer, [&]( auto &row ) {
        row.producers = producers;
        row.weight = vote_weight;
      } );
    }

    stats_table _stats{ get_self(), get_self().value };

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
      auto stats_itr = _stats.find( bp.value );

      if ( stats_itr->weight - old_vote_weight <= 0 ) {
        _stats.erase( stats_itr );
      } else {
        _stats.modify( stats_itr, eosio::same_payer, [&]( auto &row ) {
          row.weight -= old_vote_weight;
        } );
      }
    }

    // add new bp weight
    for ( eosio::name bp : new_producers ) {
      auto stats_itr = _stats.find( bp.value );

      if ( stats_itr == _stats.end() ) {
        _stats.emplace( get_self(), [&]( auto &row ) {
          // the voter could have increased his rank
          row.bp = bp;
          row.weight = vote_weight;
        } );
      } else {
        _stats.modify( stats_itr, eosio::same_payer, [&]( auto &row ) {
          row.weight += vote_weight;
        } );
      }
    }

    // update bp weight
    for ( eosio::name bp : current_producers ) {
      auto stats_itr = _stats.find( bp.value );

      if ( stats_itr->weight + ( vote_weight - old_vote_weight ) <= 0 ) {
        _stats.erase( stats_itr );
      } else {
        _stats.modify( stats_itr, eosio::same_payer, [&]( auto &row ) {
          // the voter could have increased his rank
          row.weight += vote_weight - old_vote_weight;
        } );
      }
    }
  }

  void
  smartproxy_contract::on_remove_vote( std::vector< eosio::name > producers,
                                       uint16_t                   weight ) {
    stats_table _stats{ get_self(), get_self().value };

    for ( eosio::name bp : producers ) {
      auto stats_itr = _stats.find( bp.value );

      if ( stats_itr->weight - weight <= 0 ) {
        _stats.erase( stats_itr );
      } else {
        _stats.modify( stats_itr, eosio::same_payer, [&]( auto &row ) {
          row.weight -= weight;
        } );
      }
    }
  }

  bool smartproxy_contract::is_blacklisted( eosio::name bp ) {
    blacklisted_table _blacklisted( get_self(), get_self().value );

    auto blacklisted_itr = _blacklisted.find( bp.value );

    return blacklisted_itr != _blacklisted.end();
  }

  uint16_t smartproxy_contract::calculate_vote_weight( uint16_t rank ) {
    return rank ? MAX_EDEN_GROUP_SIZE * rank : 1;
  }
} // namespace edenproxy

EOSIO_ACTION_DISPATCHER( edenproxy::actions )

EOSIO_ABIGEN( actions( edenproxy::actions ),
              table( "votes"_n, edenproxy::votes ),
              table( "stats"_n, edenproxy::stats ),
              table( "blacklisted"_n, edenproxy::blacklisted ) )