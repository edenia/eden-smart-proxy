// cltester definitions
#include <tester-base.hpp>

#define CATCH_CONFIG_RUNNER

TEST_CASE( "Require to be an eden member" ) {
  tester t;

  t.genesis();

  expect( t.alice.trace< edenproxy::actions::vote >( "alice"_n,
                                                     std::vector{ "bp1"_n } ),
          "Needs to be an active eden member" );
}

TEST_CASE( "Success vote" ) {
  tester t;

  t.genesis();
  t.create_producers();

  t.alice.act< eden::actions::actmember >( "alice"_n, "Alice Knox" );
  t.alice.act< eden::actions::setmembrank >( "alice"_n, 1, "hc"_n );

  t.alice.act< edenproxy::actions::vote >(
      "alice"_n,
      std::vector{ "bp1"_n, "bp2"_n, "bp3"_n } );

  std::map< eosio::name, uint16_t > expected{ { "alice"_n, 2 } };

  CHECK( t.get_votes() == expected );
}

TEST_CASE( "Remove non existing vote" ) {
  tester t;

  t.genesis();

  expect( t.alice.trace< edenproxy::actions::rmvote >( "alice"_n ),
          "Vote does not exist" );
}

TEST_CASE( "Vote for blacklisted bp" ) {
  tester t;

  t.genesis();
  t.create_producers();

  t.alice.act< eden::actions::actmember >( "alice"_n, "Alice Knox" );
  t.alice.act< eden::actions::setmembrank >( "alice"_n, 1, "hc"_n );

  t.smartproxy.act< edenproxy::actions::banbp >( "bp2"_n );

  expect( t.alice.trace< edenproxy::actions::vote >(
              "alice"_n,
              std::vector{ "bp1"_n, "bp2"_n, "bp3"_n } ),
          "The bp bp2 is blacklisted" );

  t.smartproxy.act< edenproxy::actions::banbp >( "bp1"_n );

  expect( t.alice.trace< edenproxy::actions::vote >(
              "alice"_n,
              std::vector{ "bp1"_n, "bp2"_n, "bp3"_n } ),
          "The bp bp1 is blacklisted" );

  t.alice.act< edenproxy::actions::vote >( "alice"_n, std::vector{ "bp3"_n } );
  t.smartproxy.act< edenproxy::actions::unbanbp >( "bp1"_n );
  t.alice.act< edenproxy::actions::vote >( "alice"_n,
                                           std::vector{ "bp1"_n, "bp3"_n } );
}

TEST_CASE( "Remove vote" ) {
  tester t;

  t.genesis();
  t.create_producers();

  t.alice.act< eden::actions::actmember >( "alice"_n, "Alice Knox" );
  t.alice.act< eden::actions::setmembrank >( "alice"_n, 1, "hc"_n );

  t.bob.act< eden::actions::actmember >( "bob"_n, "Bob Quinn" );
  t.bob.act< eden::actions::setmembrank >( "bob"_n, 4, "hc"_n );

  t.eden.act< eden::actions::setglobstats >(
      std::vector< uint16_t >{ 16, 8, 4, 2, 1 } );

  t.alice.act< edenproxy::actions::vote >(
      "alice"_n,
      std::vector{ "bp1"_n, "bp2"_n, "bp3"_n } );
  t.bob.act< edenproxy::actions::vote >( "bob"_n,
                                         std::vector{ "bp2"_n, "bp3"_n } );

  std::map< eosio::name, uint16_t > expected{ { "alice"_n, 2 },
                                              { "bob"_n, 5 } };

  CHECK( t.get_votes() == expected );

  t.alice.act< edenproxy::actions::rmvote >( "alice"_n );

  std::map< eosio::name, uint16_t > expected_stats{ { "bp2"_n, 5 },
                                                    { "bp3"_n, 5 } };

  CHECK( t.get_stats() == expected_stats );
}

TEST_CASE( "Proxy vote" ) {
  tester t;

  t.genesis();
  t.create_producers();

  t.alice.act< eden::actions::actmember >( "alice"_n, "Alice Knox" );
  t.alice.act< eden::actions::setmembrank >( "alice"_n, 1, "hc"_n );

  t.bob.act< eden::actions::actmember >( "bob"_n, "Bob Quinn" );
  t.bob.act< eden::actions::setmembrank >( "bob"_n, 2, "hc"_n );

  t.pip.act< eden::actions::actmember >( "pip"_n, "Pip Mcpherson" );
  t.pip.act< eden::actions::setmembrank >( "pip"_n, 3, "hc"_n );

  t.alice.act< edenproxy::actions::vote >(
      "alice"_n,
      std::vector{ "bp1"_n, "bp2"_n, "bp3"_n } );
  t.bob.act< edenproxy::actions::vote >( "bob"_n,
                                         std::vector{ "bp1"_n, "bp2"_n } );
  t.pip.act< edenproxy::actions::vote >(
      "pip"_n,
      std::vector{ "bp1"_n, "bp2"_n, "bp3"_n } );

  t.smartproxy.act< edenproxy::actions::proxyvote >();
}

TEST_CASE( "Refresh votes weight" ) {
  tester t;

  t.genesis();
  t.create_producers();

  // Make full votes
  t.alice.act< eden::actions::actmember >( "alice"_n, "Alice Knox" );
  t.alice.act< eden::actions::setmembrank >( "alice"_n, 1, "hc"_n );

  t.bob.act< eden::actions::actmember >( "bob"_n, "Bob Quinn" );
  t.bob.act< eden::actions::setmembrank >( "bob"_n, 2, "hc"_n );

  t.pip.act< eden::actions::actmember >( "pip"_n, "Pip Mcpherson" );
  t.pip.act< eden::actions::setmembrank >( "pip"_n, 3, "hc"_n );

  t.eden.act< eden::actions::setglobstats >(
      std::vector< uint16_t >{ 16, 8, 4, 2, 1 } );

  t.alice.act< edenproxy::actions::vote >(
      "alice"_n,
      std::vector{ "bp1"_n, "bp2"_n, "bp3"_n } );
  t.bob.act< edenproxy::actions::vote >( "bob"_n,
                                         std::vector{ "bp1"_n, "bp2"_n } );
  t.pip.act< edenproxy::actions::vote >(
      "pip"_n,
      std::vector{ "bp1"_n, "bp2"_n, "bp3"_n } );

  std::map< eosio::name, uint16_t > expected_first_stats{ { "bp1"_n, 10 },
                                                          { "bp2"_n, 10 },
                                                          { "bp3"_n, 7 } };

  CHECK( t.get_stats() == expected_first_stats );

  // Inactivate an eden member
  t.eden.act< eden::actions::inacmember >( "alice"_n );

  // Become head chief
  t.pip.act< eden::actions::setmembrank >( "pip"_n, 4, "hc"_n );

  expect( t.smartproxy.trace< edenproxy::actions::refreshvotes >( 10, true ),
          "Nothing to do" );

  t.smartproxy.act< edenproxy::actions::refreshvotes >( 10, false );

  std::map< eosio::name, uint16_t > expected_after_inactivation{
      { "bp1"_n, 8 },
      { "bp2"_n, 8 },
      { "bp3"_n, 5 } };

  CHECK( t.get_stats() == expected_after_inactivation );

  t.bob.act< eden::actions::setmembrank >( "bob"_n, 1, "hc"_n );
  t.chain.start_block();
  t.smartproxy.act< edenproxy::actions::refreshvotes >( 10, true );

  std::map< eosio::name, uint16_t > expected_after_change{ { "bp1"_n, 7 },
                                                           { "bp2"_n, 7 },
                                                           { "bp3"_n, 5 } };

  CHECK( t.get_stats() == expected_after_change );
}
