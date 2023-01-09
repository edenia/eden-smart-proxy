// cltester definitions
#include <tester-base.hpp>

#define CATCH_CONFIG_RUNNER

TEST_CASE( "Init Smart Contract" ) {
  tester t;

  //   expect( t.alice.trace< edenproxy::actions::init >( 1 ),
  //           "Missing required authority" );
  //   expect( t.edenproxyrwd.trace< edenproxy::actions::init >( 24 ),
  //           "Wrong hour time, it expects a 24 hours format" );

  //   t.edenproxyrwd.act< edenproxy::actions::init >( 7 );
  //   t.chain.start_block();

  //   expect( t.edenproxyrwd.trace< edenproxy::actions::init >( 7 ),
  //           "Contract is already initialized" );

  // (READ-TABLES) Check values are correct in the table
}
