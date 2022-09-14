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

  // change weight to points

  struct votes {
    eosio::name                account;
    std::vector< eosio::name > producers;
    uint16_t                   weight;

    uint64_t primary_key() const { return account.value; }
  };
  EOSIO_REFLECT( votes, account, producers, weight )
  typedef eosio::multi_index< "votes"_n, votes > votes_table;

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
    void removevote( eosio::name voter );
    void proxyvote();
    void refreshvotes();
    void clearall();

  private:
    const eosio::name DAO_ACCOUNT = eosio::name( "myvoteeosdao" );
  };

  EOSIO_ACTIONS( smartproxy_contract,
                 "smartproxy"_n,
                 action( vote, voter, producers ),
                 action( removevote, voter ),
                 action( proxyvote ),
                 action( refreshvotes ),
                 action( clearall ) )

} // namespace edenproxy
