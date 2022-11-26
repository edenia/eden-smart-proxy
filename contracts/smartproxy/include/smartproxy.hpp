#pragma once

#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>
// #include <utils.hpp>

#include <admin.hpp>
#include <voters.hpp>

namespace edenproxy {
  class edenproxy : public eosio::contract {
  public:
    using contract::contract;

    edenproxy( eosio::name                       receiver,
               eosio::name                       code,
               eosio::datastream< const char * > ds )
        : contract( receiver, code, ds ) {}

    void vote( eosio::name                       voter,
               eosio::name                       community,
               const std::vector< eosio::name > &producers );
    void rmvote( eosio::name voter, eosio::name community );

    void proxyvote();
    void refreshvotes( uint32_t max_steps );
    void addcommunity( eosio::name community, std::string &description );
    void rmcommunity( eosio::name community, uint32_t max_steps );
    void ban( eosio::name account );
    void unban( eosio::name account );
    void migrate();
    void clearall();
  };

  EOSIO_ACTIONS( edenproxy,
                 "smartproxy"_n,
                 action( vote, voter, community, producers ),
                 action( rmvote, voter, community ),
                 action( proxyvote ),
                 action( refreshvotes, max_steps ),
                 action( addcommunity, community, description ),
                 action( rmcommunity, community, max_steps ),
                 action( ban, account ),
                 action( unban, account ),
                 action( migrate ),
                 action( clearall ) )

} // namespace edenproxy