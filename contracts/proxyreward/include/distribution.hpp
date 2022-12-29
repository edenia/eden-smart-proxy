#pragma once

#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>
#include <eosio/singleton.hpp>
#include <eosio/time.hpp>

#include <utils.hpp>

namespace edenproxy {
  struct next_distribution {
    eosio::time_point_sec distribution_time;
    eosio::asset          total_staked;
  };
  EOSIO_REFLECT( next_distribution, distribution_time )

  struct prepare_distribution : next_distribution {
    eosio::name next_account;
  };
  EOSIO_REFLECT( prepare_distribution,
                 base next_distribution,
                 distribution_time,
                 total_staked,
                 next_account )

  struct current_distribution : next_distribution {};
  EOSIO_REFLECT( current_distribution,
                 base next_distribution,
                 distribution_time,
                 total_staked,
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

  public:
    distributions( eosio::name contract )
        : contract( contract ), distribution_sing( contract, contract.value ) {}

    void     on_init();
    uint32_t distribute_daily( uint32_t max_steps );

    bool setup_distribution();
    bool update_voters( uint32_t &max_steps );
  };

} // namespace edenproxy