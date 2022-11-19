// cltester definitions
#include <tester-base.hpp>

#define CATCH_CONFIG_RUNNER

TEST_CASE( "Init Smart Contract" ) {
  tester t;

  expect( t.alice.trace< edenproxy::actions::init >( 1, 185 ),
          "Missing required authority" );
  expect( t.edenproxyrwd.trace< edenproxy::actions::init >( 24, 185 ),
          "Wrong hour time, it expects a 24 hours format" );
  expect( t.edenproxyrwd.trace< edenproxy::actions::init >( 7, 0 ),
          "APR must be higher than 0" );

  t.edenproxyrwd.act< edenproxy::actions::init >( 7, 185 );
  t.chain.start_block();

  expect( t.edenproxyrwd.trace< edenproxy::actions::init >( 7, 185 ),
          "Contract is already initialized" );

  // (READ-TABLES) Check values are correct in the table
}

TEST_CASE( "Check Sign Up Validation" ) {
  tester t;

  // TODO: create voteproducer action for the bios contract to be able
  // to test this validation

  // expect( t.alice.trace< edenproxy::actions::signup >( "alice"_n, "alice"_n ),
  //         "Need to delegate the vote to edensmartprx" );

  expect( t.bob.trace< edenproxy::actions::signup >( "alice"_n, "alice"_n ),
          "Missing required authority" );
  expect( t.alice.trace< edenproxy::actions::signup >( "alice"_n, "alice2"_n ),
          "Account does not exist" );

  t.alice.act< edenproxy::actions::signup >( "alice"_n, "alice"_n );
  t.chain.start_block();

  expect( t.alice.trace< edenproxy::actions::signup >( "alice"_n, "alice"_n ),
          "Voter already exist" );

  // (READ-TABLES) Check values are correct in the table
}

TEST_CASE( "Remove Non-existing Account" ) {
  tester t;

  expect( t.bob.trace< edenproxy::actions::remove >( "alice"_n ),
          "Missing required authority" );
  expect( t.alice.trace< edenproxy::actions::remove >( "alice"_n ),
          "Voter does not exist" );

  t.alice.act< edenproxy::actions::signup >( "alice"_n, "alice"_n );
  t.alice.trace< edenproxy::actions::remove >( "alice"_n );

  // (READ-TABLES) Check values are removed in the table
}

TEST_CASE( "Change the Recipient" ) {
  tester t;

  t.alice.trace< edenproxy::actions::signup >( "alice"_n, "alice"_n );

  expect( t.bob.trace< edenproxy::actions::changercpt >( "alice"_n, "bob"_n ),
          "Missing required authority" );
  expect(
      t.alice.trace< edenproxy::actions::changercpt >( "alice"_n, "bob2"_n ),
      "Recipient account does not exist" );
  expect( t.bob.trace< edenproxy::actions::changercpt >( "bob"_n, "bob"_n ),
          "Voter does not exist" );

  // (READ-TABLES) Check value is updated in the table
}

TEST_CASE( "Claim" ) {
  tester t;

  t.alice.trace< edenproxy::actions::signup >( "alice"_n, "alice"_n );

  expect( t.bob.trace< edenproxy::actions::claim >( "alice"_n ),
          "Missing required authority" );
  expect( t.bob.trace< edenproxy::actions::claim >( "bob"_n ),
          "Voter does not exist" );

  // CHECK: this is failing, check why
  //   expect( t.alice.trace< edenproxy::actions::claim >( "alice"_n ),
  //           "No funds to claim" );

  // Check funds get send to the destinary correctly (eosio.token)
}

TEST_CASE( "Update Account" ) {
  tester t;

  // Voter does not exist

  // Validate voter data is udpated as expected
  // 1. account stop delegating their vote
  // 2. check user structure has changed
  // 3. account start delegating their vote again
  // 4. check staked is the right amount
  // 5. check unclaimed is the right amount
  // 6. check last_update_time is the right amount
  // 7. voter is with inactive structure, then the function get him active back again with the right structure and values
  // 8. check reward value is right according to the formula
  // 9. check reward can only happen in the right time
}

TEST_CASE( "Update All Accounts" ) {
  tester t;

  // Check max_steps approach works
  // Check voters get updated with their corresponding values
}

TEST_CASE( "Set Rate" ) {
  tester t;

  expect( t.alice.trace< edenproxy::actions::setrate >( 185 ),
          "Missing required authority" );
  expect( t.edenproxyrwd.trace< edenproxy::actions::setrate >( 185 ),
          "You must initialize the smart contract first" );

  t.edenproxyrwd.act< edenproxy::actions::init >( 7, 185 );

  expect( t.edenproxyrwd.trace< edenproxy::actions::setrate >( 0 ),
          "APR must be higher than 0" );

  t.edenproxyrwd.act< edenproxy::actions::setrate >( 185 );

  // (READ-TABLES) Check value is updated in the table
}

TEST_CASE( "Set Distribution Hour" ) {
  tester t;

  expect( t.alice.trace< edenproxy::actions::setdisthour >( 7 ),
          "Missing required authority" );
  expect( t.edenproxyrwd.trace< edenproxy::actions::setdisthour >( 7 ),
          "You must initialize the smart contract first" );

  t.edenproxyrwd.act< edenproxy::actions::init >( 7, 185 );

  expect( t.edenproxyrwd.trace< edenproxy::actions::setdisthour >( 24 ),
          "Wrong hour time, it expects a 24 hours format" );

  t.edenproxyrwd.act< edenproxy::actions::setdisthour >( 8 );

  // (READ-TABLES) Check value is updated in the table
}
