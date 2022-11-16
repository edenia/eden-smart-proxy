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
        settings_v0{ .distribution_hour = distribution_hour, .apr = apr } );

    state_singleton state_sing( get_self(), get_self().value );
    state_sing.get_or_create( get_self() );
  }

  void proxyreward_contract::signup( eosio::name owner,
                                     eosio::name recipient ) {
    require_auth( owner );

    eosio::check( is_vote_delegated( owner ),
                  "Need to delegate the vote to " +
                      PROXY_CONTRACT.to_string() );
    eosio::check( eosio::is_account( recipient ), "Account does not exist" );

    voter_table _voter( get_self(), get_self().value );
    auto        voter_itr = _voter.find( owner.value );

    eosio::check( voter_itr == _voter.end(), "Voter already exist" );

    _voter.emplace( get_self(), [&]( auto &row ) {
      row.value = voter_v1{ .owner = owner, .recipient = recipient };
    } );
  }

  void proxyreward_contract::remove( eosio::name owner ) {
    require_auth( owner );

    voter_table _voter( get_self(), get_self().value );
    auto        voter_itr = _voter.find( owner.value );

    eosio::check( voter_itr != _voter.end(), "Voter does not exist" );

    update_voter( owner );
    send_rewards( owner );

    _voter.erase( voter_itr );
  }

  void proxyreward_contract::changercpt( eosio::name owner,
                                         eosio::name new_recipient ) {
    require_auth( owner );

    voter_table _voter( get_self(), get_self().value );
    auto        voter_itr = _voter.find( owner.value );

    eosio::check( voter_itr != _voter.end(), "Voter does not exist" );

    _voter.modify( voter_itr, eosio::same_payer, [&]( auto &row ) {
      row.recipient() = new_recipient;
    } );
  }

  void proxyreward_contract::claim( eosio::name owner ) {
    require_auth( owner );

    voter_table _voter( get_self(), get_self().value );
    auto        voter_itr = _voter.find( owner.value );

    eosio::check( voter_itr != _voter.end(), "Voter does not exist" );
    eosio::check( voter_itr->unclaimed() > 0, "No funds to claim" );

    send_rewards( owner );
  }

  void proxyreward_contract::update( eosio::name owner ) {
    voter_table _voter( get_self(), get_self().value );
    auto        voter_itr = _voter.find( owner.value );

    eosio::check( voter_itr != _voter.end(), "Voter does not exist" );

    update_voter( owner );
  }

  void proxyreward_contract::updateall( uint32_t max_steps ) {
    uint32_t copy_max_steps = max_steps;
    auto     ctp = eosio::current_time_point();

    voter_table _voter( get_self(), get_self().value );
    auto        voter_index = _voter.get_index< name( "bylastupdate" ) >();
    auto        end_itr = voter_index.upper_bound( ctp.sec_since_epoch() );

    for ( auto voter_itr = voter_index.lower_bound( 0 );
          max_steps > 0 && voter_itr != end_itr;
          voter_itr = voter_index.lower_bound( 0 ) ) {
      if ( update_voter( voter_itr->owner() ) ) {
        --max_steps;
      }
    }

    eosio::check( max_steps != copy_max_steps, "Nothing to do" );
  }

  void proxyreward_contract::setrate( uint16_t apr ) {
    require_auth( get_self() );

    settings_singleton settings_sing( get_self(), get_self().value );

    eosio::check( settings_sing.exists(),
                  "You must initialize the smart contract first" );

    auto settings = std::get< settings_v0 >( settings_sing.get() );
    settings.apr = apr;
    settings_sing.set( settings, get_self() );
  }

  void proxyreward_contract::setdisthour( uint8_t distribution_hour ) {
    require_auth( get_self() );

    settings_singleton settings_sing( get_self(), get_self().value );

    eosio::check( settings_sing.exists(),
                  "You must initialize the smart contract first" );

    auto settings = std::get< settings_v0 >( settings_sing.get() );
    settings.distribution_hour = distribution_hour;
    settings_sing.set( settings, get_self() );
  }

  void proxyreward_contract::receipt( uint32_t              elapsed_sec,
                                      eosio::time_point_sec last_claim_time,
                                      eosio::name           owner,
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

    voter_table _voters( get_self(), get_self().value );
    auto        voters_iter = _voters.begin();

    while ( voters_iter != _voters.end() ) {
      voters_iter = _voters.erase( voters_iter );
    }
  }

  bool proxyreward_contract::update_voter( eosio::name owner ) {
    voter_table _voter( get_self(), get_self().value );
    auto        voter_itr = _voter.find( owner.value );

    bool is_active = is_vote_delegated( owner );

    if ( auto *itr = std::get_if< voter_v1 >( &voter_itr->value ) ) {
      if ( !is_active ) {
        update_voter_state( owner, false );
        return false;
      }

      settings_singleton settings_sing( get_self(), get_self().value );
      auto     settings = std::get< settings_v0 >( settings_sing.get() );
      auto     total_staked = get_staked_amount( owner );
      uint64_t reward =
          is_active ? total_staked * settings.apr / 10000 / 365 : 0;
      auto elapse = eosio::current_time_point().sec_since_epoch() -
                    itr->last_update_time.sec_since_epoch();

      _voter.modify( voter_itr, eosio::same_payer, [&]( auto &row ) {
        row.staked() = total_staked;
        row.unclaimed() += reward;
        row.last_update_time() = eosio::current_time_point();
      } );

      action( permission_level{ get_self(), "active"_n },
              get_self(),
              "receipt"_n,
              std::make_tuple( elapse,
                               itr->last_claim_time,
                               itr->owner,
                               reward,
                               itr->staked,
                               itr->unclaimed ) )
          .send();

      return true;
    } else {
      if ( is_active ) {
        update_voter_state( owner, false );
      }

      return false;
    }
  }

  void proxyreward_contract::send_rewards( eosio::name owner ) {
    voter_table _voter( get_self(), get_self().value );
    auto        voter_itr = _voter.find( owner.value );

    if ( !( voter_itr->unclaimed() > 0 ) ) {
      return;
    }

    auto payout =
        eosio::asset( voter_itr->unclaimed(), SUPPORTED_TOKEN_SYMBOL );

    _voter.modify( voter_itr, eosio::same_payer, [&]( auto &row ) {
      row.claimed() += payout.amount;
      row.unclaimed() = 0;
      row.last_claim_time() = eosio::current_time_point();
    } );

    // send tokens
    action( permission_level{ get_self(), "active"_n },
            SUPPORTED_TOKEN_CONTRACT,
            eosio::name( "transfer" ),
            std::make_tuple( get_self(),
                             voter_itr->recipient(),
                             payout,
                             "Reward for delegating your vote to: " +
                                 PROXY_CONTRACT.to_string() ) )
        .send();
  }

  bool proxyreward_contract::is_vote_delegated( eosio::name owner ) {
    return PROXY_CONTRACT.value == get_voter_proxy( owner ).value;
  }

  void proxyreward_contract::update_voter_state( eosio::name owner,
                                                 bool        active ) {
    voter_table _voter( get_self(), get_self().value );
    auto        voter_itr = _voter.find( owner.value );
    _voter.modify( voter_itr, eosio::same_payer, [&]( auto &row ) {
      row.value = std::visit(
          [&]( auto &v ) { return active ? voter_v1{ v } : voter_v0{ v }; },
          row.value );
    } );
  }
} // namespace edenproxy

EOSIO_ACTION_DISPATCHER( edenproxy::actions )

EOSIO_ABIGEN( actions( edenproxy::actions ),
              table( "state"_n, edenproxy::state_variant ),
              table( "settings"_n, edenproxy::settings_variant ),
              table( "voter"_n, edenproxy::voter_variant ) )