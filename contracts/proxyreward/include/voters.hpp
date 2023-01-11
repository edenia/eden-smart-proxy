#pragma once

#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>

#include <constants.hpp>
#include <reward.hpp>
#include <utils.hpp>

namespace edenproxy {
  // eosio
  struct voter_info {
    eosio::name                owner;
    eosio::name                proxy;
    std::vector< eosio::name > producers;
    int64_t                    staked = 0;
    double                     last_vote_weight = 0;
    double                     proxied_vote_weight = 0;
    bool                       is_proxy = 0;
    uint32_t                   flags1 = 0;
    uint32_t                   reserved2 = 0;
    eosio::asset               reserved3;

    uint64_t primary_key() const { return owner.value; }

    enum class flags1_fields : uint32_t {
      ram_managed = 1,
      net_managed = 2,
      cpu_managed = 4
    };
  };
  EOSIO_REFLECT( voter_info,
                 owner,
                 proxy,
                 producers,
                 staked,
                 last_vote_weight,
                 proxied_vote_weight,
                 is_proxy,
                 flags1,
                 reserved2,
                 reserved3 )
  typedef eosio::multi_index< "eosiovoters"_n, voter_info > eosio_voters_table;

  int64_t     get_staked_amount( eosio::name account );
  eosio::name get_voter_proxy( eosio::name account );
  // END - eosio

  struct voter_v0 {
    eosio::name           owner;
    eosio::name           recipient;
    uint64_t              staked;
    uint64_t              claimed;
    uint64_t              unclaimed;
    eosio::time_point_sec last_claim_time;

    uint64_t primary_key() const { return owner.value; }
  };
  EOSIO_REFLECT( voter_v0, owner, recipient, unclaimed, last_claim_time )

  struct voter_v1 : voter_v0 {};
  EOSIO_REFLECT( voter_v1,
                 base voter_v0,
                 owner,
                 recipient,
                 staked,
                 claimed,
                 unclaimed,
                 last_claim_time )

  using voter_variant = std::variant< voter_v0, voter_v1 >;

  struct voter {
    voter_variant value;
    FORWARD_MEMBERS( value,
                     owner,
                     recipient,
                     staked,
                     claimed,
                     unclaimed,
                     last_claim_time )
    FORWARD_FUNCTIONS( value, primary_key )
  };
  EOSIO_REFLECT( voter, value )
  using voter_table_type = eosio::multi_index< "voter"_n, voter >;

  bool is_vote_delegated( eosio::name owner );

  class voters {
  private:
    eosio::name      contract;
    voter_table_type voter_tb;

  public:
    voters( eosio::name contract )
        : contract( contract ), voter_tb( contract, contract.value ) {}

    const voter_table_type &get_table() const { return voter_tb; }

    void on_signup( eosio::name owner, eosio::name recipient );
    void check_resign( eosio::name owner );
    void on_resign( eosio::name owner );
    void on_changercpt( eosio::name owner, eosio::name recipient );
    void on_claim( eosio::name owner );

    void set_staked( eosio::name account, uint64_t staked );
    void add_reward( eosio::name account, uint64_t reward );
    void activate( eosio::name owner );
    void deactivate( eosio::name owner );
    void send_rewards( eosio::name owner, bool check );
  };
} // namespace edenproxy