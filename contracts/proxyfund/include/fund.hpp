#pragma once

#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>

#include <constants.hpp>

namespace eden {
  class funds : public eosio::contract {
  public:
    using eosio::contract::contract;

    funds( eosio::name                       receiver,
           eosio::name                       code,
           eosio::datastream< const char * > ds )
        : contract( receiver, code, ds ) {}

    void notify_transfer( eosio::name         from,
                          eosio::name         to,
                          const eosio::asset &quantity,
                          std::string         memo );
  };

  EOSIO_ACTIONS( funds, "edenprxfunds"_n, notify( token_contract, transfer ) )

} // namespace eden