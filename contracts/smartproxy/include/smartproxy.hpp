#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>

namespace edenproxy {
  // TODO: optimize this calculation
  uint16_t fib( uint8_t n ) {
    uint16_t j = 1, k = 1;
    uint16_t temp = 0;

    for ( uint8_t i = 2; i < n; i++ ) {
      temp = j + k;

      j = k;
      k = temp;
    }

    return k;
  }

  struct votes {
    eosio::name                account;
    std::vector< eosio::name > producers;
    uint16_t                   weight;
    uint64_t                   flag = 0;

    uint64_t primary_key() const { return account.value; }
    uint64_t by_flag() const { return flag; }
  };
  EOSIO_REFLECT( votes, account, producers, weight, flag )
  typedef eosio::multi_index<
      "votes"_n,
      votes,
      eosio::indexed_by< "byflag"_n,
                         const_mem_fun< votes, uint64_t, &votes::by_flag > > >
      votes_table;

  struct stats {
    eosio::name bp;
    uint16_t    weight;

    uint64_t primary_key() const { return bp.value; }
  };
  EOSIO_REFLECT( stats, bp, weight )
  typedef eosio::multi_index< "stats"_n, stats > stats_table;

  struct smartproxy_contract : public eosio::contract {
  public:
    using eosio::contract::contract;

    void vote( eosio::name voter, const std::vector< eosio::name > &producers );
    void rmvote( eosio::name voter );
    void proxyvote();
    void refreshvotes( uint32_t max_steps, bool flag );
    void clearall();

    void on_vote( uint16_t                          member_rank,
                  eosio::name                       voter,
                  const std::vector< eosio::name > &producers );
    void on_remove_vote( std::vector< eosio::name > producers,
                         uint16_t                   weight );

  private:
    const eosio::name DAO_ACCOUNT = eosio::name( "myvoteeosdao" );
    const eosio::name EDEN_ACCOUNT = eosio::name( "genesis.eden" );
  };

  EOSIO_ACTIONS( smartproxy_contract,
                 "smartproxy"_n,
                 action( vote, voter, producers ),
                 action( rmvote, voter ),
                 action( proxyvote ),
                 action( refreshvotes, max_steps, flag ),
                 action( clearall ) )

} // namespace edenproxy