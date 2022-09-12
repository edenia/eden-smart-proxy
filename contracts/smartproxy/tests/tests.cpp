// cltester definitions
#include <tester-base.hpp>

#define CATCH_CONFIG_RUNNER

TEST_CASE( "Require to be an eden member" ) {
  tester t;

  t.genesis();

  expect( t.alice.trace< edenproxy::actions::vote >( "alice"_n, "bp1"_n ),
          "Need to be an active eden member" );
}

TEST_CASE( "Election rank must be greater or equal to 1" ) {
  tester t;

  t.genesis();

  t.alice.act< eden::actions::setactive >( "alice"_n, "Alice Knox" );

  expect( t.alice.trace< edenproxy::actions::vote >( "alice"_n, "bp1"_n ),
          "Eden member rank should be greater or equal to 1" );
}