#pragma once

#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>
// #include <utils.hpp>

#include <admin.hpp>
#include <voters.hpp>

namespace edenproxy {

  // struct global {
  //   uint8_t  total_communities;
  //   uint32_t total_members;
  // };

  // struct state_none {};
  // EOSIO_REFLECT( state_none )
  // // EOSIO_COMPARE( state_none );

  // struct state_banning_community {
  //   uint8_t total_communities;
  // };
  // EOSIO_REFLECT( state_banning_community, total_communities )
  // // EOSIO_COMPARE( state_banning_community );

  // struct state_updating_vote_weight {
  //   uint8_t total_communities;
  // };
  // EOSIO_REFLECT( state_updating_vote_weight, total_communities )
  // // EOSIO_COMPARE( state_updating_vote_weight );

  // struct state_ready_to_vote {
  //   uint8_t total_communities;
  // };
  // EOSIO_REFLECT( state_ready_to_vote, total_communities )
  // // EOSIO_COMPARE( state_ready_to_vote );

  // using state_state = std::variant< state_none,
  //                                   state_banning_community,
  //                                   state_updating_vote_weight,
  //                                   state_ready_to_vote >;
  // using state_state_singleton = eosio::singleton< "state"_n, state_state >;

  // struct community_v0 {
  //   eosio::name account;
  //   std::string description;

  //   uint64_t primary_key() const { return account.value; }
  // };
  // EOSIO_REFLECT( community_v0, account, description )

  // struct community_v1 {
  //   eosio::name           account;
  //   std::string           description;
  //   eosio::time_point_sec birthdate;

  //   uint64_t primary_key() const { return account.value; }
  // };
  // EOSIO_REFLECT( community_v1, account, description, birthdate )

  // struct community_v2 {
  //   eosio::name account;
  //   std::string description;
  //   uint8_t     total_members;

  //   uint64_t primary_key() const { return account.value; }
  // };
  // EOSIO_REFLECT( community_v2, account, description, total_members )

  // using community_variant =
  //     std::variant< community_v0, community_v1, community_v2 >;
  // struct community {
  //   community_variant value;
  //   FORWARD_MEMBERS( value, account, description );
  //   FORWARD_FUNCTIONS( value, primary_key )
  // };
  // EOSIO_REFLECT( community, value )

  // using community_table_type = eosio::multi_index< "community"_n, community >;

  class edenproxy_contract : public eosio::contract {
  public:
    using contract::contract;

    edenproxy( eosio::name                       receiver,
               eosio::name                       code,
               eosio::datastream< const char * > ds )
        : contract( receiver, code, ds ) {}

    void vote( eosio::name voter, const std::vector< eosio::name > &producers );
    void rmvote( eosio::name voter );
    void proxyvote();
    void refreshvotes( uint32_t max_steps, bool flag );
    void banbp( eosio::name bp );
    void unbanbp( eosio::name bp );
    void clearall();
  };

  EOSIO_ACTIONS( edenproxy,
                 "smartproxy"_n,
                 action( vote, voter, producers ),
                 action( rmvote, voter ),
                 action( proxyvote ),
                 action( refreshvotes, max_steps, flag ),
                 action( banbp, bp ),
                 action( unbanbp, bp ),
                 action( clearall ) )

} // namespace edenproxy