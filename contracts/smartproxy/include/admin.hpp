#pragma once

#include <eosio/eosio.hpp>
#include <eosio/singleton.hpp>

#include <utils.hpp>

namespace edenproxy {
  // TODO: use it to ban not only a bp but also a member or a community
  enum ban_entity : uint8_t {
    e_community = 0,
    e_block_producer = 1,
    e_member = 2
  };

  struct state_standby {};
  EOSIO_REFLECT( state_standby )

  struct state_ban_community {
    uint8_t total_communities;
  };
  EOSIO_REFLECT( state_ban_community, total_communities );

  struct state_update_votes {
    uint8_t total_communities;
  };
  EOSIO_REFLECT( state_update_votes, total_communities );

  struct state_ready_to_vote {
    uint8_t total_communities;
  };
  EOSIO_REFLECT( state_ready_to_vote, total_communities );

  using state_variant = std::variant< state_standby,
                                      state_ban_community,
                                      state_update_votes,
                                      state_ready_to_vote >;
  using state_singleton = eosio::singleton< "state"_n, state_variant >;

  struct blacklisted_account {
    eosio::name account;

    uint64_t primary_key() const { return account.value; }
  };
  EOSIO_REFLECT( blacklisted_account, account );

  struct blacklisted_bp : blacklisted_account {};
  EOSIO_REFLECT( blacklisted_bp, base blacklisted_account );

  using blacklisted_variant =
      std::variant< blacklisted_account, blacklisted_bp >;

  struct blacklisted {
    blacklisted_variant value;
    FORWARD_MEMBERS( value, account );
    FORWARD_FUNCTIONS( value, primary_key );
  };
  EOSIO_REFLECT( blacklisted, value );

  using blacklisted_table = eosio::multi_index< "blacklisted"_n, blacklisted >;

  class admin {
  private:
    eosio::name       contract;
    blacklisted_table _blacklisted;
    state_singleton   st_sing;

  public:
    admin( eosio::name contract )
        : contract( contract ), _blacklisted( contract, contract.value ),
          st_sing( contract, contract.value ) {}

    void on_ban( eosio::name account );
    void on_unban( eosio::name account );
    bool is_blacklisted( eosio::name account );
  };
} // namespace edenproxy
