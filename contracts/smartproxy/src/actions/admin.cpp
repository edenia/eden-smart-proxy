#include <admin.hpp>
#include <smartproxy.hpp>

// #include <myvoteeosdao/myvoteeosdao.hpp>

namespace edenproxy {
  void edenproxy_contract::banbp( eosio::name bp ) {
    require_auth( get_self() );

    // eosio::check( is_blockproducer( bp ),
    //               "Only Block Producers can be banned" );

    admin{ get_self() }.on_banbp( bp );
  }

  void edenproxy_contract::unbanbp( eosio::name bp ) {
    require_auth( get_self() );

    admin{ get_self() }.on_unbanbp( bp );
  }

  void edenproxy_contract::clearall() {
    require_auth( get_self() );

    // votes_table _votes{ get_self(), get_self().value };

    // for ( auto itr = _votes.begin(); itr != _votes.end(); ) {
    //   itr = _votes.erase( itr );
    // }

    // stats_table _stats{ get_self(), get_self().value };

    // for ( auto itr = _stats.begin(); itr != _stats.end(); ) {
    //   itr = _stats.erase( itr );
    // }

    // blacklisted_table _blacklisted{ get_self(), get_self().value };

    // for ( auto itr = _blacklisted.begin(); itr != _blacklisted.end(); ) {
    //   itr = _blacklisted.erase( itr );
    // }
  }
} // namespace edenproxy