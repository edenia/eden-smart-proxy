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

    eden::member member = eden::members_contract::get_member( voter );

    eosio::check( member.status() == eden::member_status::active_member,
                  "Need to be an active eden member" );

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

    // TODO: hc and ch must have the same weight

    uint16_t vote_weight = fib( member.election_rank() + 1 );
    uint16_t old_vote_weight = 0;

    votes_table _votes{ get_self(), get_self().value };
    auto        votes_itr = _votes.find( voter.value );

    if ( votes_itr == _votes.end() ) {
      _votes.emplace( get_self(), [&]( auto &row ) {
        row.account = voter;
        row.producers = producers;
        row.weight = vote_weight;
      } );
    } else {
      old_vote_weight = votes_itr->weight;

      _votes.modify( votes_itr, eosio::same_payer, [&]( auto &row ) {
        row.producers = producers;
        row.weight = vote_weight;
      } );
    }

    // TODO: what if user include/exclude a bp in their new vote?

    stats_table _stats{ get_self(), get_self().value };

    for ( eosio::name bp : producers ) {
      auto stats_itr = _stats.find( bp.value );

      if ( stats_itr == _stats.end() ) {
        _stats.emplace( get_self(), [&]( auto &row ) {
          row.bp = bp;
          row.weight = vote_weight;
        } );
      } else {
        _stats.modify( stats_itr, eosio::same_payer, [&]( auto &row ) {
          row.weight += vote_weight - old_vote_weight;
        } );
      }
    }
  }

  void smartproxy_contract::removevote( eosio::name voter ) {
    require_auth( voter );

    votes_table _votes{ get_self(), get_self().value };
    auto        votes_itr = _votes.find( voter.value );

    eosio::check( votes_itr != _votes.end(), "Vote does not exist" );

    stats_table _stats{ get_self(), get_self().value };

    for ( eosio::name bp : votes_itr->producers ) {
      auto stats_itr = _stats.find( bp.value );

      // TODO: could be less than 0 ?
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

  void smartproxy_contract::proxyvote() {
    require_auth( get_self() );

    std::vector< std::pair< eosio::name, uint16_t > > bps;

    stats_table _stats{ get_self(), get_self().value };

    for ( auto itr = _stats.begin(); itr != _stats.end(); itr++ ) {
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
    // re-calculate votes
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
} // namespace edenproxy

EOSIO_ACTION_DISPATCHER( edenproxy::actions )

EOSIO_ABIGEN( actions( edenproxy::actions ),
              table( "votes"_n, edenproxy::votes ),
              table( "stats"_n, edenproxy::stats ) )