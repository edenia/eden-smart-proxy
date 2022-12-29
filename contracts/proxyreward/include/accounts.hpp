#pragma once

#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>
#include <eosio/singleton.hpp>
#include <eosio/time.hpp>

#include <constants.hpp>
#include <utils.hpp>

namespace edenproxy {
  struct account_v0 {
    eosio::asset balance;
  };
  EOSIO_REFLECT( account_v0, balance )

  using account_variant = std::variant< account_v0 >;
  using account_singleton = eosio::singleton< "account"_n, account_variant >;

  class accounts {
  private:
    eosio::name       contract;
    account_singleton account_sing;

  public:
    accounts( eosio::name contract )
        : contract( contract ), account_sing( contract, contract.value ) {}

    void add_balance( eosio::name account, eosio::asset amount );
    void sub_balance( eosio::name account, eosio::asset amount );
  };

} // namespace edenproxy