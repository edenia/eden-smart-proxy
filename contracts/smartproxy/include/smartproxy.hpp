#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>

namespace edenproxy {

  bool is_eden_member( eosio::name account ) { return true; }

  bool is_bp_whitelisted( eosio::name bp ) { return true; }

  struct smartproxy {
    eosio::name account;
    eosio::name bp;

    uint64_t primary_key() const { return account.value; }
  };
  EOSIO_REFLECT( smartproxy, account, bp )
  typedef eosio::multi_index< "smartproxy"_n, smartproxy > smartproxy_table;

  struct smartproxy_contract : public eosio::contract {
  public:
    using eosio::contract::contract;

    void vote( eosio::name voter, eosio::name bp );

  private:
    const eosio::name DEFAULT_ACCOUNT = eosio::name( "smartproxy" );
  };

  EOSIO_ACTIONS( smartproxy_contract,
                 "smartproxy"_n,
                 action( vote, voter, bp ) )

} // namespace edenproxy
