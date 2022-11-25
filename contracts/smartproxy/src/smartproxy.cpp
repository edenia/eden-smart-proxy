#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>

#include <admin.hpp>
#include <communities.hpp>
#include <smartproxy.hpp>
#include <voters.hpp>

EOSIO_ACTION_DISPATCHER( edenproxy::actions )

EOSIO_ABIGEN( actions( edenproxy::actions ),
              table( "community"_n, edenproxy::community_variant ),
              table( "voter"_n, edenproxy::voter_variant ),
              table( "score"_n, edenproxy::score_variant ),
              table( "blacklisted"_n, edenproxy::blacklisted ) )