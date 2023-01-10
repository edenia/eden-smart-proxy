#include <accounts.hpp>
#include <distributions.hpp>
#include <reward.hpp>

namespace edenproxy {
  void reward::init() {
    require_auth( get_self() );

    accounts{ get_self() }.on_init();
    distributions{ get_self() }.on_init();
  }

  void reward::distribute( uint32_t max_steps ) {
    eosio::print( "TESTING\n" );
    distributions distributions( get_self() );

    eosio::check( distributions.distribute_daily( max_steps ) != max_steps,
                  "Nothing to do" );
  }

  void reward::receipt( eosio::name           owner,
                        eosio::asset          reward,
                        eosio::asset          staked,
                        eosio::asset          unclaimed,
                        eosio::time_point_sec distribution_time ) {
    require_auth( get_self() );
  }
} // namespace edenproxy