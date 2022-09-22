#pragma once

#include "constants.hpp"
#include "utils.hpp"
#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>

namespace eden {
  using member_status_type = uint8_t;
  enum member_status : member_status_type {
    pending_membership = 0,
    active_member = 1
  };

  struct member_v0 {
    eosio::name        account;
    std::string        name;
    member_status_type status;
    uint64_t           nft_template_id;
    // Only reflected in v1
    uint8_t     election_participation_status = 0;
    uint8_t     election_rank = 0;
    eosio::name representative{ uint64_t( -1 ) };

    uint64_t  primary_key() const { return account.value; }
    uint128_t by_representative() const {
      return ( static_cast< uint128_t >( election_rank ) << 64 ) |
             representative.value;
    }
  };
  EOSIO_REFLECT( member_v0, account, name, status, nft_template_id )

  struct member_v1 : member_v0 {};
  EOSIO_REFLECT( member_v1,
                 base member_v0,
                 election_participation_status,
                 election_rank,
                 representative );

  using member_variant = std::variant< member_v0, member_v1 >;

  struct member {
    member_variant value;
    EDEN_FORWARD_MEMBERS( value,
                          account,
                          name,
                          status,
                          nft_template_id,
                          election_participation_status,
                          election_rank,
                          representative );
    EDEN_FORWARD_FUNCTIONS( value, primary_key, by_representative )
  };
  EOSIO_REFLECT( member, value )

  using member_table_type = eosio::multi_index<
      "member"_n,
      member,
      eosio::indexed_by< "byrep"_n,
                         eosio::const_mem_fun< member,
                                               uint128_t,
                                               &member::by_representative > > >;

  struct member_stats_v0 {
    uint16_t active_members;
    uint16_t pending_members;
    uint16_t completed_waiting_inductions;
  };
  EOSIO_REFLECT( member_stats_v0,
                 active_members,
                 pending_members,
                 completed_waiting_inductions );

  struct member_stats_v1 : member_stats_v0 {
    std::vector< uint16_t > ranks;
  };
  EOSIO_REFLECT( member_stats_v1, base member_stats_v0, ranks )

  using member_stats_variant = std::variant< member_stats_v0, member_stats_v1 >;
  using member_stats_singleton =
      eosio::singleton< "memberstats"_n, member_stats_variant >;

  class members {
  private:
    eosio::name            contract;
    member_table_type      member_tb;
    member_stats_singleton member_stats;

  public:
    members( eosio::name contract )
        : contract( contract ), member_tb( contract, default_scope ),
          member_stats( contract, default_scope ) {}

    // const member_table_type &get_table() const { return member_tb; }
    const member &get_member( eosio::name account );
    void          create( eosio::name account );
    void          check_active_member( eosio::name account );
    void          check_pending_member( eosio::name account );
    void          setactive( eosio::name account, const std::string &name );
    void          setinactive( eosio::name account );
    void
    setrank( eosio::name account, uint8_t rank, eosio::name representative );
    void setstats( std::vector< uint16_t > ranks );
    // bool            is_active_member( eosio::name account ) const;
    member_stats_v1 stats();

    // static const member &get_member( eosio::name account ) {
    //   member_table_type member_tb2{ eden_contract, default_scope };
    //   return member_tb2.get(
    //       account.value,
    //       ( "member " + account.to_string() + " not found" ).c_str() );
    // }

    // static const member_stats_v1 &get_stats() {
    //   member_stats_singleton stats_sing2{ eden_contract, default_scope };
    //   return stats_sing2.get();
    // }
  };

} // namespace eden