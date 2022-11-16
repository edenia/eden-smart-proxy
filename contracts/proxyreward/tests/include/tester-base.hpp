#include <eden/eden.hpp>
#include <eosio/tester.hpp>
#include <myvoteeosdao/myvoteeosdao.hpp>

#include <proxyreward.hpp>

// Catch2 unit testing framework. https://github.com/catchorg/Catch2
#define CATCH_CONFIG_MAIN
#include <catch2/catch.hpp>

using namespace eosio;
using user_context = test_chain::user_context;

void eden_setup( test_chain &t ) {
  t.set_code( "genesis.eden"_n, "eden.wasm" );
}

void myvoteeosdao_setup( test_chain &t ) {
  t.set_code( "myvoteeosdao"_n, "myvoteeosdao.wasm" );
}

void smartproxy_setup( test_chain &t ) {
  t.set_code( "smartproxy"_n, "smartproxy.wasm" );
}

struct tester {
  test_chain   chain;
  user_context eden = chain.as( "genesis.eden"_n );
  user_context myvoteeosdao = chain.as( "myvoteeosdao"_n );
  user_context smartproxy = chain.as( "smartproxy"_n );

  user_context alice = chain.as( "alice"_n );
  user_context bob = chain.as( "bob"_n );
  user_context pip = chain.as( "pip"_n );
  user_context egeon = chain.as( "egeon"_n );
  user_context bertie = chain.as( "bertie"_n );
  user_context ahab = chain.as( "ahab"_n );

  tester() {
    // chain.create_code_account( "genesis.eden"_n );
    // chain.create_code_account( "smartproxy"_n );
    // chain.create_code_account( "myvoteeosdao"_n );
    // eden_setup( chain );
    // myvoteeosdao_setup( chain );
    // smartproxy_setup( chain );
    // for ( auto account :
    //       { "alice"_n, "bob"_n, "pip"_n, "egeon"_n, "bertie"_n, "ahab"_n } ) {
    //   chain.create_account( account );
    // }
  }

  void genesis() {
    // eden.act< eden::actions::createmember >( "alice"_n );
    // eden.act< eden::actions::createmember >( "bob"_n );
    // eden.act< eden::actions::createmember >( "pip"_n );
  }

  void create_producers() {
    // for ( auto account : { "bp1"_n, "bp2"_n, "bp3"_n, "bp4"_n, "bp5"_n } ) {
    //   chain.create_account( account );
    //   myvoteeosdao.act< dao::actions::addproducer >( account );
    // }
  }

  auto get_votes() const {
      // std::map< eosio::name, uint16_t > result;
      // edenproxy::votes_table _votes{ "smartproxy"_n, "smartproxy"_n.value };

      // for ( auto t : _votes ) {
      //   auto [iter, _] = result.insert( std::pair( t.account, t.weight ) );
      // }

      // return result;
  };

  auto get_stats() const {
      // std::map< eosio::name, uint16_t > result;
      // edenproxy::stats_table _stats{ "smartproxy"_n, "smartproxy"_n.value };

      // for ( auto t : _stats ) {
      //   auto [iter, _] = result.insert( std::pair( t.bp, t.weight ) );
      // }

      // return result;
  };
};