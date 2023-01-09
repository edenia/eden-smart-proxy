#include <eden/eden.hpp>
#include <eosio/tester.hpp>
#include <myvoteeosdao/myvoteeosdao.hpp>

#include <accounts.hpp>
#include <distributions.hpp>
#include <reward.hpp>
#include <voters.hpp>

// Catch2 unit testing framework. https://github.com/catchorg/Catch2
#define CATCH_CONFIG_MAIN
#include <catch2/catch.hpp>

using namespace eosio;
using user_context = test_chain::user_context;

void proxyreward_setup( test_chain &t ) {
  t.set_code( "edenproxyrwd"_n, "proxyreward.wasm" );
}

struct tester {
  test_chain   chain;
  user_context eden = chain.as( "genesis.eden"_n );
  user_context edenproxyrwd = chain.as( "edenproxyrwd"_n );

  user_context alice = chain.as( "alice"_n );
  user_context bob = chain.as( "bob"_n );
  user_context pip = chain.as( "pip"_n );
  user_context egeon = chain.as( "egeon"_n );
  user_context bertie = chain.as( "bertie"_n );
  user_context ahab = chain.as( "ahab"_n );

  user_context fakeaccount = chain.as( "account.fake"_n );

  tester() {
    chain.create_code_account( "genesis.eden"_n );
    chain.create_code_account( "edenproxyrwd"_n );
    proxyreward_setup( chain );
    for ( auto account : { "alice"_n,
                           "bob"_n,
                           "pip"_n,
                           "egeon"_n,
                           "bertie"_n,
                           "ahab"_n,
                           "account.fake"_n } ) {
      chain.create_account( account );
    }
  }

  void skip_to( std::string_view time ) {
    uint64_t value;
    check( string_to_utc_microseconds( value,
                                       time.data(),
                                       time.data() + time.size() ),
           "bad time" );

    time_point tp{ microseconds( value ) };

    chain.finish_block();
    auto head_tp = chain.get_head_block_info().timestamp.to_time_point();
    auto skip = ( tp - head_tp ).count() / 1000 - 500;
    chain.start_block( skip );
  }

  auto get_account() const {
    return edenproxy::accounts( "edenproxyrwd"_n ).account();
  };

  auto get_distribution() const {
    return edenproxy::distributions( "edenproxyrwd"_n ).distribution();
  };

  auto get_voters() const {
    std::map< eosio::name, std::vector< uint64_t > > result;
    edenproxy::voter_table_type                      voter_tb{ "edenproxyrwd"_n,
                                          "edenproxyrwd"_n.value };

    for ( auto t : voter_tb ) {
      if ( auto *voter = std::get_if< edenproxy::voter_v1 >( &t.value ) ) {
        result.insert( std::pair(
            voter->owner,
            std::vector{ voter->staked, voter->claimed, voter->unclaimed } ) );
      }
    }

    return result;
  };

  auto get_recipients() const {
    std::map< eosio::name, eosio::name > result;
    edenproxy::voter_table_type          voter_tb{ "edenproxyrwd"_n,
                                          "edenproxyrwd"_n.value };

    for ( auto t : voter_tb ) {
      if ( auto *voter = std::get_if< edenproxy::voter_v1 >( &t.value ) ) {
        result.insert( std::pair( voter->owner, voter->recipient ) );
      }
    }

    return result;
  };

  // auto get_stats() const {
  //     // std::map< eosio::name, uint16_t > result;
  //     // edenproxy::stats_table _stats{ "smartproxy"_n, "smartproxy"_n.value };

  //     // for ( auto t : _stats ) {
  //     //   auto [iter, _] = result.insert( std::pair( t.bp, t.weight ) );
  //     // }

  //     // return result;
  // };
};