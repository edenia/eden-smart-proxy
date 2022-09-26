#pragma once

/*
 *
 * @author  edenia.com [ https://edenia.com ]
 *
 * @section DESCRIPTION
 *  Header file for the declaration of all functions
 *
 *  GitHub: https://github.com/eoscostarica/MyvoteEOS-proxy
 *
 */
#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>
#include <eosio/permission.hpp>

using namespace std;
using namespace eosio;
using eosio::public_key;

constexpr name system_account{ "eosio"_n };

/*
* EOSIO producer_info table
*/
struct producer_info {
  name              owner;
  double            total_votes = 0;
  eosio::public_key producer_key; /// a packed public key object
  bool              is_active = true;
  std::string       url;
  uint32_t          unpaid_blocks = 0;
  time_point        last_claim_time;
  uint16_t          location = 0;

  uint64_t primary_key() const { return owner.value; }
  double   by_votes() const { return is_active ? -total_votes : total_votes; }
  bool     active() const { return is_active; }
  void     deactivate() {
        producer_key = public_key();
        is_active = false;
  }

  // explicit serialization macro is not necessary, used here only to improve compilation time
  EOSLIB_SERIALIZE(
      producer_info,
      (owner)(total_votes)(producer_key)(is_active)(url)(unpaid_blocks)(last_claim_time)( location ) )
};
typedef eosio::multi_index<
    "producers"_n,
    producer_info,
    indexed_by<
        "prototalvote"_n,
        const_mem_fun< producer_info, double, &producer_info::by_votes > > >
    producers_table;

/*
* EOSIO voter_info table
*/
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

  EOSLIB_SERIALIZE(
      voter_info,
      (owner)(proxy)(producers)(staked)(last_vote_weight)(proxied_vote_weight)(is_proxy)(flags1)(reserved2)( reserved3 ) )
};
typedef eosio::multi_index< "voters"_n, voter_info > voters_table;

/**
*
*  Verify is an account is a block producer
*
* @param bp_name - Contains the name of the account that we want to verify as bp
*
* @return true is the account is a block producer, otherwise returns false
*/
bool is_blockproducer( name bp_name ) {
  producers_table bp( system_account, system_account.value );
  auto            it = bp.find( bp_name.value );
  if ( it == bp.end() ) {
    return false;
  }
  return it->is_active;
}

/**
*
*  Verify is an account is an active proxy
*
* @param name - Contains the name of the account that we want to verify as an active proxy
*
* @return true is the account is an antiVe proxy, otherwise returns false
*/
bool is_proxy( name name ) {
  voters_table _voters( system_account, system_account.value );
  auto         it = _voters.find( name.value );
  return it != _voters.end() && it->is_proxy;
}

namespace dao {
  struct proxy {
    name proxy;

    auto primary_key() const { return proxy.value; }
  };
  EOSIO_REFLECT( proxy, proxy )
  typedef multi_index< name( "proxy" ), proxy > proxy_table;

  struct producer {
    name producer;
    auto primary_key() const { return producer.value; }
  };
  EOSIO_REFLECT( producer, producer )
  typedef multi_index< name( "producer" ), producer > producer_table;

  struct myvoteeosdao : public contract {
  public:
    using contract::contract;

    /**
     * Add proxy to the list of proxies
     *
     * This action allow add a new proxy
     *
     *
     * @return no return value.
     */
    void addproxy( name proxy );

    /**
     * Remove proxy from the list of proxies
     *
     * This action allow remove a proxy
     *
     *
     * @return no return value.
     */
    void rmproxy( name proxy );

    /**
     * Add block producer to the list of block producers
     *
     * This action allow add a new block producers
     *
     *
     * @return no return value.
     */
    void addproducer( name producer );

    /**
     * Remove block producer from the list of block producers
     *
     * This action allow remove a block producers
     *
     *
     * @return no return value.
     */
    void rmproducer( name producer );

    /**
     * Check block producer is in the list of block producers
     *
     * This action allow to check if a block producers is whitelisted
     *
     *
     * @return true if whitelisted, false if not.
     */
    static bool checkbp( name contract, name owner, name producer ) {
      producer_table _producer( contract, owner.value );
      auto           producer_itr = _producer.find( producer.value );

      return producer_itr != _producer.end();
    }

    void clear();
  };

  EOSIO_ACTIONS( myvoteeosdao,
                 "myvoteeosdao"_n,
                 action( addproxy, proxy ),
                 action( rmproxy, proxy ),
                 action( addproducer, producer ),
                 action( rmproducer, producer ),
                 action( clear ) )
} // namespace dao