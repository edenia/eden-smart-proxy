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

  void edenproxy::rmcommunity( uint32_t max_steps, eosio::name community ) {
    require_auth( get_self() );

    communities communities{ get_self() };

    if ( communities.exist( community ) ) {
      admin  admin{ get_self() };
      voters voters_self{ get_self(), get_self().value };
      voters voters_community{ get_self(), community.value };

      admin.set_bancommunity( community );

      eosio::check( admin.validate_community_ban( community ),
                    "Currently banning another community" );

      // TODO: wrongly scoped, it required to be a mixed scope table, get_self for score and community.value for voters
      max_steps = voters_self.remove_community_votes( max_steps );
      max_steps = voters_community.remove_community( max_steps );
      communities.on_rmcommunity( community );

      if ( max_steps > 0 ) {
        admin.set_standby();
      }
    } else {
      eosio::check( false, "Nothing to do" );
    }
  }

  void edenproxy::ban( uint32_t max_steps, eosio::name account ) {
    require_auth( get_self() );

    // TODO: remove vote weight for all the votes that belongs to this community

    // TODO: fix bp validation
    // eosio::check( is_blockproducer( bp ),
    //               "Only Block Producers can be banned" );

    communities communities{ get_self() };

    // if ( communities.exist( community ) ) {
    //   admin  admin{ get_self() };
    //   voters voters_self{ get_self(), get_self().value };
    //   voters voters_community{ get_self(), community.value };

    //   admin.set_bancommunity( community );

    //   eosio::check( admin.validate_community_ban( community ),
    //                 "Currently banning another community" );

    //   max_steps = voters_self.remove_community_votes( max_steps );
    //   admin{ get_self() }.on_ban( account );

    //   if ( max_steps > 0 ) {
    //     admin.set_standby();
    //   }
    // } else {
    //   eosio::check( false, "Nothing to do" );
    // }
  }

  void edenproxy::unban( eosio::name account ) {
    require_auth( get_self() );

    admin{ get_self() }.on_unban( account );
  }

  void edenproxy::migrate() {
    require_auth( get_self() );

    // call on_migrate action
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