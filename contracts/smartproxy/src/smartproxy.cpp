#include <eden/eden.hpp>
#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>

#include <smartproxy.hpp>

namespace edenproxy {
  void smartproxy_contract::vote( eosio::name voter, eosio::name bp ) {
    require_auth( voter );

    // eden::member member = eden::members_contract::get_member( voter );

    // eosio::check( member.status() == eden::member_status::active_member,
    //               "Need to be an active eden member" );
    // eosio::check( member.election_rank(),
    //               "Eden member rank should be greater or equal to 1" );
    eosio::check( is_bp_whitelisted( bp ), "Only whitelisted bps are allowed" );

    // hc == ch
    //

    smartproxy_table _smartproxy{ get_self(), get_self().value };
    auto             smartproxy_itr = _smartproxy.find( voter.value );

    if ( smartproxy_itr == _smartproxy.end() ) {
      _smartproxy.emplace( get_self(), [&]( auto &row ) {
        row.account = voter;
        row.bp = bp;
      } );
    } else {
      _smartproxy.modify( smartproxy_itr, get_self(), [&]( auto &row ) {
        row.bp = bp;
      } );
    }
  }

  // vote
  // remove
} // namespace edenproxy

EOSIO_ACTION_DISPATCHER( edenproxy::actions )

EOSIO_ABIGEN( actions( edenproxy::actions ),
              table( "smartproxy"_n, edenproxy::smartproxy ) )