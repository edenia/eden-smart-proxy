#include <eden/eden.hpp>
#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>

#include <smartproxy.hpp>

namespace edenproxy {
  void smartproxy_contract::vote( eosio::name voter, eosio::name bp ) {
    require_auth( voter );

    eden::member member = eden::members_contract::get_member( voter );

    eosio::check( member.status() == eden::member_status::active_member,
                  "Need to be an active eden member" );
    eosio::check( member.election_rank(),
                  "Eden member rank should be greater or equal to 1" );
    eosio::check( is_bp_whitelisted( bp ), "Only whitelisted bps are allowed" );

    // hc == ch same weight

    uint16_t vote_weight = fib( member.election_rank() );

    votes_table _votes{ get_self(), get_self().value };
    auto        votes_itr = _votes.find( voter.value );

    if ( votes_itr == _votes.end() ) {
      _votes.emplace( get_self(), [&]( auto &row ) {
        row.account = voter;
        row.bp = bp;
        row.weight = vote_weight;
      } );
    } else {
      _votes.modify( votes_itr, eosio::same_payer, [&]( auto &row ) {
        row.bp = bp;
        row.weight = vote_weight;
      } );
    }

    stats_table _stats{ get_self(), get_self().value };
    auto        stats_itr = _stats.find( bp.value );

    if ( stats_itr == _stats.end() ) {
      _stats.emplace( get_self(),
                      [&]( auto &row ) { row.weight += vote_weight; } );
    } else {
      _stats.modify( stats_itr, eosio::same_payer, [&]( auto &row ) {
        row.bp = bp;
        row.weight = vote_weight;
      } );
    }
  }

  void smartproxy_contract::removevote( eosio::name voter ) {
    require_auth( voter );

    votes_table _votes{ get_self(), get_self().value };
    auto        votes_itr = _votes.find( voter.value );

    eosio::check( votes_itr != _votes.end(), "Voter does not exist" );

    stats_table _stats{ get_self(), get_self().value };
    auto        stats_itr = _stats.find( votes_itr->bp.value );

    // TODO: could be less than 0 ?
    if ( votes_itr->weight - stats_itr->weight <= 0 ) {
      _stats.erase( stats_itr );
    } else {
      _stats.modify( stats_itr, eosio::same_payer, [&]( auto &row ) {
        row.weight -= votes_itr->weight;
      } );
    }

    _votes.erase( votes_itr );
  }

  void smartproxy_contract::proxyvote() {
    require_auth( get_self() );

    // first  = lowest
    // back   = highest
    std::vector< std::pair< eosio::name, uint16_t > > bps;

    stats_table _stats{ get_self(), get_self().value };

    for ( auto itr = _stats.begin(); itr != _stats.end(); itr++ ) {
      std::pair< eosio::name, uint16_t > temp;
      // uint16_t distance = !bps.empty() ? bps.front() - bps.back() : 0;
      int pos = (int)bps.size() / 2;
      int direction = bps[pos].second > itr->weight ? -1 : 1;
    }

    // vote for bps
  }

} // namespace edenproxy

EOSIO_ACTION_DISPATCHER( edenproxy::actions )

EOSIO_ABIGEN( actions( edenproxy::actions ),
              table( "votes"_n, edenproxy::votes ),
              table( "stats"_n, edenproxy::stats ) )