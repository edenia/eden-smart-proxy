#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>
#include <numeric>

#include <members.cpp>
#include <myvoteeosdao/myvoteeosdao.hpp>

#include <proxyreward.hpp>

namespace edenproxy {

  void proxyreward_contract::init( uint8_t distribution_hour, uint16_t apr ) {
    settings_singleton settings_sing( get_self(), get_self().value );

    eosio::check( !settings_sing.exists(), "Contract is already initialized" );

    settings_sing.get_or_create(
        get_self(),
        settings{ .distribution_hour = distribution_hour, .apr = apr } );

    state_singleton state_sing( get_self(), get_self().value );
    state_sing.get_or_create( get_self() );
  }

  void proxyreward_contract::addvoter( eosio::name account ) {
    require_auth( get_self() );

    voters_table _voter( get_self(), get_self().value );
    auto         voter_itr = _voter.find( account.value );

    eosio::check( voter_itr == _voter.end(), "Voter already exist" );

    _voter.emplace( get_self(), [&]( auto &row ) { row.account = account; } );
  }

  void proxyreward_contract::claim( eosio::name account ) {
    require_auth( account );

    voters_table _voter( get_self(), get_self().value );
    auto         voter_itr = _voter.find( account.value );

    eosio::check( voter_itr != _voter.end(), "Voter does not exist" );
    eosio::check( voter_itr->unclaimed > 0, "No funds to claim" );

    auto payout = eosio::asset( voter_itr->unclaimed, SUPPORTED_TOKEN_SYMBOL );

    _voter.modify( voter_itr, eosio::same_payer, [&]( auto &row ) {
      row.claimed += payout.amount;
      row.unclaimed = 0;
      row.last_claim_time = eosio::current_time_point();
    } );

    // send new_tokens
    action( permission_level{ get_self(), "active"_n },
            SUPPORTED_TOKEN_CONTRACT,
            eosio::name( "transfer" ),
            std::make_tuple( get_self(),
                             account,
                             payout,
                             "Reward for delegating your vote to: " +
                                 PROXY_CONTRACT.to_string() ) )
        .send();
  }

  void proxyreward_contract::update( eosio::name account ) {
    voters_table _voter( get_self(), get_self().value );
    auto         voter_itr = _voter.find( account.value );

    eosio::check( voter_itr != _voter.end(), "Voter does not exist" );

    settings_singleton setting_sing( get_self(), get_self().value );

    auto     total_staked = get_staked( account );
    uint64_t reward = total_staked * setting_sing.get().apr / 10000 / 365;

    _voter.modify( voter_itr, eosio::same_payer, [&]( auto &row ) {
      row.staked = total_staked;
      row.unclaimed = reward;
      row.last_update_time = eosio::current_time_point();
    } );
  }

  void proxyreward_contract::updateall( uint32_t max_steps ) {
    //
  }

  void proxyreward_contract::setrate( uint16_t apr ) {
    require_auth( get_self() );

    settings_singleton settings_sing( get_self(), get_self().value );

    eosio::check( settings_sing.exists(),
                  "You must initialize the smart contract first" );

    auto settings = settings_sing.get();
    settings.apr = apr;
    settings_sing.set( settings, get_self() );
  }

  void proxyreward_contract::setdisthour( uint8_t distribution_hour ) {
    require_auth( get_self() );

    settings_singleton settings_sing( get_self(), get_self().value );

    eosio::check( settings_sing.exists(),
                  "You must initialize the smart contract first" );

    auto settings = settings_sing.get();
    settings.distribution_hour = distribution_hour;
    settings_sing.set( settings, get_self() );
  }

  void proxyreward_contract::receipt( uint32_t              elapsed_sec,
                                      eosio::time_point_sec last_claim_time,
                                      eosio::name           account,
                                      eosio::asset          reward,
                                      eosio::asset          staked,
                                      eosio::asset          unclaimed ) {
    require_auth( get_self() );
  }

  void proxyreward_contract::clearall() {
    settings_singleton settings_sing( get_self(), get_self().value );
    settings_sing.remove();

    state_singleton state_sing( get_self(), get_self().value );
    state_sing.remove();
  }
} // namespace edenproxy

EOSIO_ACTION_DISPATCHER( edenproxy::actions )

EOSIO_ABIGEN( actions( edenproxy::actions ),
              table( "state"_n, edenproxy::state ),
              table( "settings"_n, edenproxy::settings ),
              table( "voters"_n, edenproxy::voters ) )