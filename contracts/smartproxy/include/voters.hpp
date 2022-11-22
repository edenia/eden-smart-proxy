#pragma once

#include <eosio/eosio.hpp>
#include <utils.hpp>

namespace edenproxy {
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

  struct stats {
    eosio::name bp;
    uint16_t    weight;

    uint64_t primary_key() const { return bp.value; }
  };
  EOSIO_REFLECT( stats, bp, weight )
  typedef eosio::multi_index< "stats"_n, stats > stats_table;

  class voters {
  private:
    eosio::name contract;
    votes_table _votes;
    stats_table _stats;

  public:
    voters( eosio::name contract )
        : contract( contract ), _votes( contract, contract.value ),
          _stats( contract, contract.value ) {}

    // const votes_table &get_table() const { return _votes; }
    void     member_vote( eosio::name                       voter,
                          const std::vector< eosio::name > &producers );
    void     on_rmvote( eosio::name voter );
    void     on_proxyvote();
    void     on_refreshvotes( uint32_t max_steps, bool flag );
    void     on_vote( uint16_t                          member_rank,
                      eosio::name                       voter,
                      const std::vector< eosio::name > &producers );
    void     on_remove_vote( std::vector< eosio::name > producers,
                             uint16_t                   weight );
    uint16_t calculate_vote_weight( uint16_t                 rank,
                                    std::vector< uint16_t > &stat_ranks );
  };
} // namespace edenproxy