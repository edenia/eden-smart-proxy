#include <admin.hpp>
#include <communities.hpp>
#include <smartproxy.hpp>

// #include <myvoteeosdao/myvoteeosdao.hpp>

namespace edenproxy {
  void edenproxy::addcommunity( eosio::name  community,
                                std::string &description ) {
    require_auth( get_self() );
    eosio::check( description.size() <= 256,
                  "Description has more than 256 bytes" );

    communities{ get_self() }.on_addcommunity( community, description );
  }

  void edenproxy::rmcommunity( eosio::name community ) {
    require_auth( get_self() );

    // TODO: remove vote weight for all the votes that belongs to this community

    communities{ get_self() }.on_rmcommunity( community );
  }

  void edenproxy::ban( eosio::name account ) {
    require_auth( get_self() );

    // eosio::check( is_blockproducer( bp ),
    //               "Only Block Producers can be banned" );

    admin{ get_self() }.on_ban( account );
  }

  void edenproxy::unban( eosio::name account ) {
    require_auth( get_self() );

    admin{ get_self() }.on_unban( account );
  }

  void edenproxy::clearall() {
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