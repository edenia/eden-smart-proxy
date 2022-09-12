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

  struct members_contract : public eosio::contract {
  private:
    eosio::name       contract;
    member_table_type member_tb;
    // member_stats_singleton member_stats;

  public:
    using contract::contract;

    members_contract( eosio::name                       receiver,
                      eosio::name                       code,
                      eosio::datastream< const char * > ds )
        : eosio::contract( receiver, code, ds ), contract( receiver ),
          member_tb( receiver, default_scope ) {}

    // const member_table_type &get_table() const { return member_tb; }
    void create( eosio::name account );
    void check_active_member( eosio::name account );
    void check_pending_member( eosio::name account );
    void setactive( eosio::name account, const std::string &name );
    void
    set_rank( eosio::name account, uint8_t rank, eosio::name representative );

    static const member &get_member( eosio::name account ) {
      member_table_type member_tb2{ eden_contract, default_scope };
      return member_tb2.get(
          account.value,
          ( "member " + account.to_string() + " not found" ).c_str() );
    }
  };

  EOSIO_ACTIONS( members_contract,
                 "eden"_n,
                 action( create, account ),
                 action( set_rank, account, rank, representative ),
                 action( setactive, account, name ) )

} // namespace eden