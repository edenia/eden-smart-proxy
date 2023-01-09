#include <reward.hpp>
#include <voters.hpp>

namespace edenproxy {
  void reward::signup( eosio::name owner, eosio::name recipient ) {
    require_auth( owner );

    voters{ get_self() }.on_signup( owner, recipient );
  }

  void reward::rmvoter( eosio::name owner ) {
    require_auth( owner );

    voters{ get_self() }.on_remove( owner );
  }

  void reward::changercpt( eosio::name owner, eosio::name recipient ) {
    require_auth( owner );

    voters{ get_self() }.on_changercpt( owner, recipient );
  }

  void reward::claim( eosio::name owner ) {
    require_auth( owner );

    voters voters( get_self() );
    voters.on_claim( owner );
  }
} // namespace edenproxy