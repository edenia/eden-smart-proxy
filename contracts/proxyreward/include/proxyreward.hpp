#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>

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

  int64_t get_staked( eosio::name account ) {
    eosio_voters_table _voters( "eosio"_n, "eosio"_n.value );

    auto voters_itr = _voters.find( account.value );

    return voters_itr->staked;
  }

  // END - eosio

  struct state {
    eosio::time_point_sec next_reward;
  };
  EOSIO_REFLECT( state, next_reward )
  typedef eosio::singleton< "state"_n, state > state_singleton;

  struct settings {
    uint8_t  distribution_hour;
    uint16_t apr;
  };
  EOSIO_REFLECT( settings, distribution_hour, apr )
  typedef eosio::singleton< "settings"_n, settings > settings_singleton;

  struct voters {
    eosio::name           account;
    uint64_t              staked;
    uint64_t              claimed;
    uint64_t              unclaimed;
    eosio::time_point_sec last_update_time;
    eosio::time_point_sec last_claim_time;

    uint64_t primary_key() const { return account.value; }
    uint64_t by_last_update() const {
      return last_update_time.sec_since_epoch();
    }
  };
  EOSIO_REFLECT( voters,
                 account,
                 staked,
                 claimed,
                 unclaimed,
                 last_update_time,
                 last_claim_time )
  typedef eosio::multi_index<
      "voters"_n,
      voters,
      eosio::indexed_by<
          "bylastupdate"_n,
          const_mem_fun< voters, uint64_t, &voters::by_last_update > > >
      voters_table;

  struct proxyreward_contract : public eosio::contract {
  public:
    using eosio::contract::contract;

    void init( uint8_t distribution_hour, uint16_t apr );
    void addvoter( eosio::name account );
    void claim( eosio::name account );
    void update( eosio::name account );
    void updateall( uint32_t max_steps );
    void setrate( uint16_t apr );
    void setdisthour( uint8_t distribution_hour );
    void receipt( uint32_t              elapsed_sec,
                  eosio::time_point_sec last_claim_time,
                  eosio::name           account,
                  eosio::asset          reward,
                  eosio::asset          staked,
                  eosio::asset          unclaimed );
    void clearall();

  private:
    const eosio::name   PROXY_CONTRACT = "edensmartprx"_n;
    const eosio::name   SUPPORTED_TOKEN_CONTRACT = name( "eosio.token" );
    const eosio::symbol SUPPORTED_TOKEN_SYMBOL = symbol( "EOS", 4 );
  };

  EOSIO_ACTIONS( proxyreward_contract,
                 "edenproxyrwd"_n,
                 action( init, distribution_hour, apr ),
                 action( addvoter, account ),
                 action( claim, account ),
                 action( update, account ),
                 action( updateall, max_steps ),
                 action( setrate, apr ),
                 action( setdisthour, distribution_hour ),
                 action( clearall ) )

} // namespace edenproxy