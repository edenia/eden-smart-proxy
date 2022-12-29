#include <distributions.hpp>
#include <reward.hpp>

namespace edenproxy {
  void reward::init() {
    require_auth( get_self() );

    distributions distributions( get_self() );
    distributions.on_init();
  }

  void reward::updateall( uint32_t max_steps ) {
    distributions distributions( get_self() );

    eosio::check( distributions.distribute_daily( max_steps ) != max_steps,
                  "Nothing to do" );
  }

  void reward::receipt( eosio::name           owner,
                        eosio::asset          reward,
                        eosio::asset          staked,
                        eosio::asset          unclaimed,
                        eosio::time_point_sec last_claim_time ) {
    require_auth( get_self() );
  }
} // namespace edenproxy