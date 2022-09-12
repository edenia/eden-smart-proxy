#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>

namespace edenproxy {

  bool is_bp_whitelisted( eosio::name bp ) { return true; }

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
    eosio::name account;
    eosio::name bp;
    uint16_t    weight;

    uint64_t primary_key() const { return account.value; }
    uint64_t by_bp() const { return bp.value; }
  };
  EOSIO_REFLECT( votes, account, bp, weight )
  typedef eosio::multi_index<
      "votes"_n,
      votes,
      eosio::indexed_by<
          "bybp"_n,
          eosio::const_mem_fun< votes, uint64_t, &votes::by_bp > > >
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

    void vote( eosio::name voter, eosio::name bp );
    void removevote( eosio::name voter );
    void proxyvote();
    void refreshvotes();

  private:
    const eosio::name DEFAULT_ACCOUNT = eosio::name( "smartproxy" );
    const eosio::name DEFAULT_DAO_ACCOUNT = eosio::name( "myvoteeosdao" );
  };

  EOSIO_ACTIONS( smartproxy_contract,
                 "smartproxy"_n,
                 action( vote, voter, bp ),
                 action( removevote, voter ),
                 action( proxyvote ),
                 action( refreshvotes ) )

} // namespace edenproxy
