#pragma once

#include <eosio/eosio.hpp>

namespace edenproxy {
  struct blacklisted {
    eosio::name bp;

    uint64_t primary_key() const { return bp.value; }
  };
  EOSIO_REFLECT( blacklisted, bp )
  typedef eosio::multi_index< "blacklisted"_n, blacklisted > blacklisted_table;

  class admin {
  private:
    eosio::name       contract;
    blacklisted_table _blacklisted;

  public:
    admin( eosio::name contract )
        : contract( contract ), _blacklisted( contract, contract.value ) {}

    void on_banbp( eosio::name bp );
    void on_unbanbp( eosio::name bp );
    bool is_blacklisted( eosio::name bp );
  };
} // namespace edenproxy
