#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>

#include <admin.hpp>
#include <communities.hpp>
#include <smartproxy.hpp>
#include <voters.hpp>

EOSIO_ACTION_DISPATCHER( edenproxy::actions )

EOSIO_ABIGEN( actions( edenproxy::actions ),
              table( "community"_n, edenproxy::community_variant ),
              table( "votes"_n, edenproxy::votes ),
              table( "stats"_n, edenproxy::stats ),
              table( "blacklisted"_n, edenproxy::blacklisted ) )