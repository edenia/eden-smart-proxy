#pragma once

#include <eosio/eosio.hpp>
#include <eosio/singleton.hpp>

#include <utils.hpp>

namespace edenproxy {
  struct community_v0 {
    eosio::name account;
    std::string description;
    uint16_t    total_members;

    uint64_t primary_key() const { return account.value; }
  };
  EOSIO_REFLECT( community_v0, account );

  struct community_v1 : community_v0 {};
  EOSIO_REFLECT( community_v1, base community_v0, description, total_members );

  using community_variant = std::variant< community_v0, community_v1 >;

  struct community {
    community_variant value;
    FORWARD_MEMBERS( value, account, description, total_members );
    FORWARD_FUNCTIONS( value, primary_key );
  };
  EOSIO_REFLECT( community, value );

  using community_table_type = eosio::multi_index< "community"_n, community >;

  class communities {
  private:
    eosio::name          contract;
    community_table_type community_tb;

  public:
    communities( eosio::name contract )
        : contract( contract ), community_tb( contract, contract.value ) {}

    void on_addcommunity( eosio::name community, std::string &description );
    void on_rmcommunity( eosio::name community );
  };
} // namespace edenproxy
