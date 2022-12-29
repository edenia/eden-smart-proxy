#include <distributions.hpp>
#include <reward.hpp>
#include <voters.hpp>

EOSIO_ACTION_DISPATCHER( edenproxy::actions )

EOSIO_ABIGEN( actions( edenproxy::actions ),
              table( "distribution"_n, edenproxy::distribution_variant ),
              //   table( "settings"_n, edenproxy::settings_variant ),
              table( "voter"_n, edenproxy::voter_variant ) )