#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>
#include <utils.hpp>

namespace edenproxy {

  // eosio
  struct voter_info {
    name                owner;
    name                proxy;
    std::vector< name > producers;
    int64_t             staked = 0;
    double              last_vote_weight = 0;
    double              proxied_vote_weight = 0;
    bool                is_proxy = 0;
    uint32_t            flags1 = 0;
    uint32_t            reserved2 = 0;
    eosio::asset        reserved3;

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

  int64_t get_staked_amount( eosio::name account ) {
    eosio_voters_table _voters( "eosio"_n, "eosio"_n.value );

    auto voters_itr = _voters.find( account.value );

    return voters_itr->staked;
  }

  eosio::name get_voter_proxy( eosio::name account ) {
    eosio_voters_table _voters( "eosio"_n, "eosio"_n.value );

    auto voters_itr = _voters.find( account.value );

    return voters_itr != _voters.end() ? voters_itr->proxy : eosio::name{};
  }
  // END - eosio

  struct state_v0 {
    eosio::time_point_sec next_reward;
  };
  EOSIO_REFLECT( state_v0, next_reward )
  using state_variant = std::variant< state_v0 >;
  using state_singleton = eosio::singleton< "state"_n, state_variant >;

  struct settings_v0 {
    uint8_t  distribution_hour;
    uint16_t apr;
  };
  EOSIO_REFLECT( settings_v0, distribution_hour, apr )
  using settings_variant = std::variant< settings_v0 >;
  using settings_singleton = eosio::singleton< "settings"_n, settings_variant >;

  struct voter_v0 {
    eosio::name           owner;
    eosio::name           recipient;
    uint64_t              staked;
    uint64_t              claimed;
    uint64_t              unclaimed;
    eosio::time_point_sec last_update_time;
    eosio::time_point_sec last_claim_time;

    uint64_t primary_key() const { return owner.value; }
    uint64_t by_last_update() const {
      return last_update_time.sec_since_epoch();
    }
  };
  EOSIO_REFLECT( voter_v0, owner, recipient, unclaimed, last_claim_time )

  struct voter_v1 : voter_v0 {
    eosio::name           owner;
    eosio::name           recipient;
    uint64_t              staked;
    uint64_t              claimed;
    uint64_t              unclaimed;
    eosio::time_point_sec last_update_time;
    eosio::time_point_sec last_claim_time;
  };
  EOSIO_REFLECT( voter_v1, base voter_v0, staked, claimed, last_claim_time )

  using voter_variant = std::variant< voter_v0, voter_v1 >;

  struct voter {
    voter_variant value;
    FORWARD_MEMBERS( value,
                     owner,
                     recipient,
                     staked,
                     claimed,
                     unclaimed,
                     last_update_time,
                     last_claim_time );
    FORWARD_FUNCTIONS( value, primary_key, by_last_update )
  };
  EOSIO_REFLECT( voter, value )
  typedef eosio::multi_index<
      "voter"_n,
      voter,
      eosio::indexed_by<
          "bylastupdate"_n,
          const_mem_fun< voter, uint64_t, &voter::by_last_update > > >
      voter_table;

  struct proxyreward_contract : public eosio::contract {
  public:
    using eosio::contract::contract;

    void init( uint8_t distribution_hour, uint16_t apr );
    void signup( eosio::name owner, eosio::name recipient );
    void remove( eosio::name owner );
    void changercpt( eosio::name owner, eosio::name recipient );
    void claim( eosio::name owner );
    void update( eosio::name owner );
    void updateall( uint32_t max_steps );
    void setrate( uint16_t apr );
    void setdisthour( uint8_t distribution_hour );
    void receipt( uint32_t              elapsed_sec,
                  eosio::time_point_sec last_claim_time,
                  eosio::name           owner,
                  eosio::asset          reward,
                  eosio::asset          staked,
                  eosio::asset          unclaimed );
    void clearall();

    bool update_voter( eosio::name owner );
    void send_rewards( eosio::name owner );
    bool is_vote_delegated( eosio::name owner );
    void update_voter_state( eosio::name owner, bool active );

  private:
    const eosio::name   PROXY_CONTRACT = "edensmartprx"_n;
    const eosio::name   SUPPORTED_TOKEN_CONTRACT = name( "eosio.token" );
    const eosio::symbol SUPPORTED_TOKEN_SYMBOL = symbol( "EOS", 4 );
  };

  EOSIO_ACTIONS( proxyreward_contract,
                 "edenproxyrwd"_n,
                 action( init, distribution_hour, apr ),
                 action( signup, owner, recipient ),
                 action( remove, owner ),
                 action( changercpt, owner, recipient ),
                 action( claim, owner ),
                 action( update, owner ),
                 action( updateall, max_steps ),
                 action( setrate, apr ),
                 action( setdisthour, distribution_hour ),
                 action( clearall ) )

} // namespace edenproxy