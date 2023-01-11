#pragma once

#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>
#include <eosio/singleton.hpp>
#include <eosio/time.hpp>

#include <constants.hpp>
#include <utils.hpp>

namespace edenproxy {
  /*struct account_v0 {
    eosio::asset balance;
  };
  EOSIO_REFLECT( account_v0, balance )

  using account_variant = std::variant< account_v0 >;
  using account_singleton = eosio::singleton< "account"_n, account_variant >;*/

  struct next_distribution {
    eosio::time_point_sec distribution_time;
    eosio::asset          total_staked;
    eosio::asset          total_distribution;
  };
  EOSIO_REFLECT( next_distribution, distribution_time )

  struct prepare_distribution : next_distribution {
    eosio::name next_account;
  };
  EOSIO_REFLECT( prepare_distribution,
                 base next_distribution,
                 distribution_time,
                 total_staked,
                 total_distribution,
                 next_account )

  struct current_distribution : prepare_distribution {
    eosio::asset total_distributed;
  };
  EOSIO_REFLECT( current_distribution,
                 base next_distribution,
                 distribution_time,
                 total_staked,
                 total_distribution,
                 total_distributed,
                 next_account )

  using distribution_variant = std::
      variant< next_distribution, prepare_distribution, current_distribution >;
  using distribution_singleton =
      eosio::singleton< "distribution"_n, distribution_variant >;

  // struct settings_v0 {
  //   uint8_t distribution_hour;
  // };
  // EOSIO_REFLECT( settings_v0, distribution_hour )
  // using settings_variant = std::variant< settings_v0 >;
  // using settings_singleton = eosio::singleton< "settings"_n, settings_variant >;

  class distributions {
  private:
    eosio::name            contract;
    distribution_singleton distribution_sing;
    // account_singleton      account_sing;

  public:
    distributions( eosio::name contract )
        : contract( contract ), distribution_sing( contract, contract.value )
    /*account_sing( contract, contract.value ) */ {}

    void     on_init();
    uint32_t distribute_daily( uint32_t max_steps );

    bool setup_distribution();
    void update_voters( uint32_t &max_steps, prepare_distribution &prep_dist );
    void distribute_rewards( uint32_t             &max_steps,
                             current_distribution &curr_dist );
    bool is_distribution_in_progress();

    next_distribution distribution();
  };

} // namespace edenproxy