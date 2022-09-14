// cltester definitions
#include <tester-base.hpp>

#define CATCH_CONFIG_RUNNER

TEST_CASE( "Require to be an eden member" ) {
  tester t;

  t.genesis();

  expect( t.alice.trace< edenproxy::actions::vote >( "alice"_n,
                                                     std::vector{ "bp1"_n } ),
          "Need to be an active eden member" );
}

TEST_CASE( "BP is not whitelisted" ) {
  tester t;

  t.genesis();
}

TEST_CASE( "Success vote" ) {
  tester t;

  t.genesis();

  // Read table records
}

TEST_CASE( "Remove non existing vote" ) {
  tester t;

  t.genesis();
}

TEST_CASE( "Remove vote" ) {
  tester t;

  t.genesis();

  // Read the table
  // Validate that the corresponding weight was removed for that bp
  // Remove bp weight to 0 and validate stats record is removed
}

TEST_CASE( "Proxy vote" ) {
  tester t;

  t.genesis();
  t.create_producers();

  t.alice.act< eden::actions::setactive >( "alice"_n, "Alice Knox" );
  t.alice.act< eden::actions::setrank >( "alice"_n, 1, "hc"_n );

  t.bob.act< eden::actions::setactive >( "bob"_n, "Bob Quinn" );
  t.bob.act< eden::actions::setrank >( "bob"_n, 2, "hc"_n );

  t.pip.act< eden::actions::setactive >( "pip"_n, "Pip Mcpherson" );
  t.pip.act< eden::actions::setrank >( "pip"_n, 3, "hc"_n );

  t.alice.act< edenproxy::actions::vote >(
      "alice"_n,
      std::vector{ "bp1"_n, "bp2"_n, "bp3"_n } );
  t.bob.act< edenproxy::actions::vote >( "bob"_n,
                                         std::vector{ "bp1"_n, "bp2"_n } );
  t.pip.act< edenproxy::actions::vote >(
      "pip"_n,
      std::vector{ "bp1"_n, "bp2"_n, "bp3"_n } );

  t.smartproxy.act< edenproxy::actions::proxyvote >();

  // Validate right permission
  // Check vote is done in the right bp order according to their weight
}

TEST_CASE( "Refresh votes weight" ) {
  tester t;

  t.genesis();

  // Make full votes
  // Inactivate an eden member
  // Change rank for two eden members
  // Check bp weight is as expected
}
