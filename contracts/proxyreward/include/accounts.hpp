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
        : contract( contract ), account_sing( contract, self_account.value ) {}

    void         on_init();
    eosio::asset get_balance();
    bool         has_funds();
    void         add_balance( eosio::asset amount );
    void         sub_balance( eosio::asset amount );

    account_v0 account();
  };

} // namespace edenproxy