#pragma once

#include <eosio/eosio.hpp>
#include <utils.hpp>

namespace edenproxy {

  // NOTE: votes struct is the first implementation of the voters, the new version
  // of the smart contract migrates from votes to voters with the std::variant
  // approach to easy updating in the future if required.

  // struct votes is deprecated
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
      eosio::indexed_by<
          "byflag"_n,
          eosio::const_mem_fun< votes, uint64_t, &votes::by_flag > > >
      votes_table;

  struct voter_v0 {
    eosio::name                account;
    std::vector< eosio::name > producers;
    uint16_t                   weight;

    uint64_t primary_key() const { return account.value; }
  };
  EOSIO_REFLECT( voter_v0, account )

  struct voter_v1 : voter_v0 {};
  EOSIO_REFLECT( voter_v1, base voter_v0, producers, weight )

  using voter_variant = std::variant< voter_v0, voter_v1 >;

  struct voter {
    voter_variant value;
    FORWARD_MEMBERS( value, account, producers, weight )
    FORWARD_FUNCTIONS( value, primary_key )
  };
  EOSIO_REFLECT( voter, value )

  using voter_table_type = eosio::multi_index< "voter"_n, voter >;

  // NOTE: stats struct is the first implementation of the bp stats, the new version
  // of the smart contract migrates from stats to score with the std::variant
  // approach to easy updating in the future if required.

  // struct stats is deprecated
  struct stats {
    eosio::name bp;
    uint16_t    weight;

    uint64_t primary_key() const { return bp.value; }
  };
  EOSIO_REFLECT( stats, bp, weight )
  typedef eosio::multi_index< "stats"_n, stats > stats_table;

  struct score_v0 {
    eosio::name bp;
    uint32_t    weight;

    uint64_t primary_key() const { return bp.value; }
  };
  EOSIO_REFLECT( score_v0, bp, weight )

  using score_variant = std::variant< score_v0 >;

  struct score {
    score_variant value;
    FORWARD_MEMBERS( value, bp, weight )
    FORWARD_FUNCTIONS( value, primary_key )
  };
  EOSIO_REFLECT( score, value )

  using score_table_type = eosio::multi_index< "score"_n, score >;

  class voters {
  private:
    eosio::name      contract;
    uint64_t         scope;
    votes_table      _votes; // DEPRECATED
    voter_table_type voter_tb;
    stats_table      _stats; // DEPRECATED
    score_table_type score_tb;

  public:
    voters( eosio::name contract, uint64_t scope )
        : contract( contract ), scope( scope ), _votes( contract, scope ),
          voter_tb( contract, scope ), _stats( contract, scope ),
          score_tb( contract, scope ) {}

    // const votes_table &get_table() const { return _votes; }
    void     member_vote( eosio::name                       voter,
                          const std::vector< eosio::name > &producers );
    void     on_rmvote( eosio::name voter );
    void     on_proxyvote();
    uint32_t on_refreshvotes( uint32_t max_steps );
    void     on_vote( uint16_t                          member_rank,
                      eosio::name                       voter,
                      const std::vector< eosio::name > &producers );
    void     on_remove_vote( std::vector< eosio::name > producers,
                             uint16_t                   weight );
    uint16_t calculate_vote_weight( uint16_t                 rank,
                                    std::vector< uint16_t > &stat_ranks );
  };
} // namespace edenproxy