#include <reward.hpp>
#include <voter.hpp>

namespace edenproxy {
  void reward::signup( eosio::name owner, eosio::name recipient ) {
    require_auth( owner );

    voters voters( get_self() );
    voters.on_signup( owner, recipient );
  }

  void reward::remove( eosio::name owner ) {
    require_auth( owner );

    voters voters( get_self() );
    voters.on_remove( owner );
  }

  void reward::changercpt( eosio::name owner, eosio::name recipient ) {
    require_auth( owner );

    eosio::check( eosio::is_account( recipient ),
                  "Recipient is not an account" );

    voters voters( get_self() );
    voters.on_changercpt( owner, recipient );
  }

  void reward::claim( eosio::name owner ) {
    require_auth( owner );

    voters voters( get_self() );
    voters.on_claim( owner );
  }
} // namespace edenproxy