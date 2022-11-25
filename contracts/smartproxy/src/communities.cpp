#include <communities.hpp>
#include <eden/eden.hpp>

namespace edenproxy {
  void communities::on_addcommunity( eosio::name  community,
                                     std::string &description ) {
    auto itr = community_tb.find( community.value );

    eosio::check( itr == community_tb.end(), "Community already exist" );

    community_tb.emplace( contract, [&]( auto &row ) {
      row.value =
          community_v1{ { .account = community, .description = description } };
    } );
  }

  void communities::on_rmcommunity( eosio::name community ) {
    auto itr = community_tb.find( community.value );

    eosio::check( itr != community_tb.end(), "Community already exist" );

    community_tb.erase( itr );
  }
} // namespace edenproxy