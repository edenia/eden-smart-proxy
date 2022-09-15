#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>

#include <eden/eden.hpp>
#include <myvoteeosdao/myvoteeosdao.hpp>

#include <smartproxy.hpp>

namespace edenproxy {
  void
  smartproxy_contract::vote( eosio::name                       voter,
                             const std::vector< eosio::name > &producers ) {
    require_auth( voter );

    eosio::check( producers.size() >= 1 && producers.size() <= 30 );

    eden::member member = eden::members_contract::get_member( voter );

    eosio::check( member.status() == eden::member_status::active_member,
                  "Needs to be an active eden member" );
    eosio::check(
        dao::myvoteeosdao::checkbp( DAO_ACCOUNT, DAO_ACCOUNT, producers[0] ),
        "Only whitelisted bps are allowed" );

    for ( size_t i = 1; i < producers.size(); ++i ) {
      eosio::check( producers[i - 1] < producers[i],
                    "Producer votes must be unique and sorted" );
      eosio::check(
          dao::myvoteeosdao::checkbp( DAO_ACCOUNT, DAO_ACCOUNT, producers[i] ),
          "Only whitelisted bps are allowed" );
    }

    on_vote( member, voter, producers );
  }

  void smartproxy_contract::rmvote( eosio::name voter ) {
    require_auth( voter );

    on_remove_vote( voter );
  }

  void smartproxy_contract::proxyvote() {
    require_auth( get_self() );

    std::vector< std::pair< eosio::name, uint16_t > > bps;

    stats_table _stats{ get_self(), get_self().value };

    for ( auto itr = _stats.begin(); itr != _stats.end(); itr++ ) {
      // TODO: exclude unactive bps
      bps.push_back( std::pair{ itr->bp, itr->weight } );
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

  void smartproxy_contract::refreshvotes() {
    votes_table _votes{ get_self(), get_self().value };

    for ( auto votes_itr = _votes.begin(); votes_itr != _votes.end(); ) {
      eden::member member =
          eden::members_contract::get_member( votes_itr->account );

      if ( member.status() != eden::member_status::active_member ) {
        on_remove_vote( votes_itr->account );

        continue;
      }

      uint16_t vote_weight = fib( member.election_rank() + 1 );

      if ( votes_itr->weight == vote_weight ) {
        continue;
      }

      on_vote( member, votes_itr->account, votes_itr->producers );
    }
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
  }

  void
  smartproxy_contract::on_vote( eden::member                      member,
                                eosio::name                       voter,
                                const std::vector< eosio::name > &producers ) {
    // TODO: hc and ch must have the same weight

    uint16_t                   vote_weight = fib( member.election_rank() + 1 );
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

  void smartproxy_contract::on_remove_vote( eosio::name voter ) {
    votes_table _votes{ get_self(), get_self().value };
    auto        votes_itr = _votes.find( voter.value );

    eosio::check( votes_itr != _votes.end(), "Vote does not exist" );

    stats_table _stats{ get_self(), get_self().value };

    for ( eosio::name bp : votes_itr->producers ) {
      auto stats_itr = _stats.find( bp.value );

      if ( stats_itr->weight - votes_itr->weight <= 0 ) {
        _stats.erase( stats_itr );
      } else {
        _stats.modify( stats_itr, eosio::same_payer, [&]( auto &row ) {
          row.weight -= votes_itr->weight;
        } );
      }
    }

    _votes.erase( votes_itr );
  }
} // namespace edenproxy

EOSIO_ACTION_DISPATCHER( edenproxy::actions )

EOSIO_ABIGEN( actions( edenproxy::actions ),
              table( "votes"_n, edenproxy::votes ),
              table( "stats"_n, edenproxy::stats ) )