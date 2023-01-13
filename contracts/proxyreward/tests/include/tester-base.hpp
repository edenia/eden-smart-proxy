#include <eden/eden.hpp>
#include <eosio/tester.hpp>

#include <myvoteeosdao/myvoteeosdao.hpp>
#include <token/token.hpp>

#include <accounts.hpp>
#include <constants.hpp>
#include <distributions.hpp>
#include <reward.hpp>
#include <voters.hpp>

// Catch2 unit testing framework. https://github.com/catchorg/Catch2
#define CATCH_CONFIG_MAIN
#include <catch2/catch.hpp>

using namespace eosio;
using user_context = test_chain::user_context;

void proxyreward_setup( test_chain &t ) {
  t.create_code_account( "edenproxyrwd"_n );
  t.set_code( "edenproxyrwd"_n, "proxyreward.wasm" );
}

void proxyfunds_setup( test_chain &t ) {
  t.create_code_account( "edenprxfunds"_n );
  t.set_code( "edenprxfunds"_n, "fund.wasm" );
}

void token_setup( test_chain &t ) {
  t.create_code_account( "eosio.token"_n );
  t.create_code_account( "fake.token"_n );

  t.set_code( "eosio.token"_n, "token.wasm" );
  t.set_code( "fake.token"_n, "token.wasm" );

  t.as( "eosio.token"_n )
      .act< token::actions::create >( "eosio.token"_n,
                                      s2a( "9000000000000.0000 EOS" ) );
  t.as( "eosio.token"_n )
      .act< token::actions::issue >( "eosio.token"_n,
                                     s2a( "9000000000000.0000 EOS" ),
                                     "" );
  t.as( "eosio.token"_n )
      .act< token::actions::create >( "eosio.token"_n,
                                      s2a( "9000000000000.0000 OTHER" ) );
  t.as( "eosio.token"_n )
      .act< token::actions::issue >( "eosio.token"_n,
                                     s2a( "9000000000000.0000 OTHER" ),
                                     "" );

  t.as( "fake.token"_n )
      .with_code( "fake.token"_n )
      .act< token::actions::create >( "fake.token"_n,
                                      s2a( "9000000000000.0000 EOS" ) );
  t.as( "fake.token"_n )
      .with_code( "fake.token"_n )
      .act< token::actions::issue >( "fake.token"_n,
                                     s2a( "9000000000000.0000 EOS" ),
                                     "" );
}

struct tester {
  test_chain   chain;
  user_context token = chain.as( "eosio.token"_n );
  user_context faketoken = chain.as( "fake.token"_n );
  user_context eden = chain.as( "genesis.eden"_n );
  user_context edenprxfunds = chain.as( "edenprxfunds"_n );
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

    token_setup( chain );
    proxyfunds_setup( chain );
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

  void fund_accounts() {
    for ( auto account : { "eosio"_n,
                           "alice"_n,
                           "bob"_n,
                           "pip"_n,
                           "egeon"_n,
                           "bertie"_n,
                           "ahab"_n } ) {
      chain.as( "eosio.token"_n )
          .act< token::actions::transfer >( "eosio.token"_n,
                                            account,
                                            s2a( "1000000000000.0000 EOS" ),
                                            "memo" );

      chain.as( "eosio.token"_n )
          .act< token::actions::transfer >( "eosio.token"_n,
                                            account,
                                            s2a( "1000000000000.0000 OTHER" ),
                                            "memo" );

      chain.as( "fake.token"_n )
          .with_code( "fake.token"_n )
          .act< token::actions::transfer >( "fake.token"_n,
                                            account,
                                            s2a( "1000000000000.0000 EOS" ),
                                            "memo" );
    }
  }

  auto get_account() const {
    return edenproxy::accounts( "edenproxyrwd"_n ).account();
  };

  auto get_distribution() const {
    return edenproxy::distributions( "edenproxyrwd"_n ).distribution();
  };

  void full_signup() {
    std::vector< eosio::name > accounts =
        { "alice"_n, "bob"_n, "pip"_n, "egeon"_n, "bertie"_n, "ahab"_n };

    for ( auto account : accounts ) {
      chain.as( account ).act< edenproxy::actions::signup >( account, account );
    }
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
};