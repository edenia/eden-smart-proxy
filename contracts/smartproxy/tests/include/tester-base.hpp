#include <eden/eden.hpp>
#include <eosio/tester.hpp>
#include <smartproxy.hpp>

// Catch2 unit testing framework. https://github.com/catchorg/Catch2
#define CATCH_CONFIG_MAIN
#include <catch2/catch.hpp>

using namespace eosio;
using user_context = test_chain::user_context;

void eden_setup( test_chain &t ) {
  t.set_code( "genesis.eden"_n, "eden.wasm" );
}

void smartproxy_setup( test_chain &t ) {
  t.set_code( "smartproxy"_n, "smartproxy.wasm" );
}

struct tester {
  test_chain   chain;
  user_context eden = chain.as( "genesis.eden"_n );
  user_context alice = chain.as( "alice"_n );
  user_context bob = chain.as( "bob"_n );
  user_context pip = chain.as( "pip"_n );
  user_context egeon = chain.as( "egeon"_n );
  user_context bertie = chain.as( "bertie"_n );
  user_context ahab = chain.as( "ahab"_n );

  user_context bp1 = chain.as( "bp1"_n );

  tester() {
    chain.create_code_account( "genesis.eden"_n );
    chain.create_code_account( "smartproxy"_n );
    smartproxy_setup( chain );
    eden_setup( chain );
    for ( auto account : { "alice"_n,
                           "bob"_n,
                           "pip"_n,
                           "egeon"_n,
                           "bertie"_n,
                           "ahab"_n,
                           "bp1"_n } ) {
      chain.create_account( account );
    }
  }

  void genesis() {
    eden.act< eden::actions::create >( "alice"_n );
    eden.act< eden::actions::create >( "bob"_n );
  }
};
