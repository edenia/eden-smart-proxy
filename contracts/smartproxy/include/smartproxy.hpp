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

    void vote( eosio::name voter, const std::vector< eosio::name > &producers );
    void rmvote( eosio::name voter );

    void proxyvote();
    void refreshvotes( uint32_t max_steps, bool flag );
    void addcommunity( eosio::name community, std::string &description );
    void rmcommunity( eosio::name community );
    void ban( eosio::name account );
    void unban( eosio::name account );
    void clearall();
  };

  EOSIO_ACTIONS( edenproxy,
                 "smartproxy"_n,
                 action( vote, voter, producers ),
                 action( rmvote, voter ),
                 action( proxyvote ),
                 action( refreshvotes, max_steps, flag ),
                 action( addcommunity, community, description ),
                 action( rmcommunity, community ),
                 action( ban, bp ),
                 action( unban, bp ),
                 action( clearall ) )

} // namespace edenproxy