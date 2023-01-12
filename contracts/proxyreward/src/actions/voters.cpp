#include <distributions.hpp>
#include <reward.hpp>
#include <voters.hpp>

namespace edenproxy {
  void reward::signup( eosio::name owner, eosio::name recipient ) {
    require_auth( owner );

    voters{ get_self() }.on_signup( owner, recipient );
  }

  void reward::resign( eosio::name owner ) {
    require_auth( owner );

    eosio::check( !distributions( get_self() ).is_distribution_in_progress(),
                  "Cannot resign while a distribution is in progress" );

    voters voters{ get_self() };
    voters.check_resign( owner );
    voters.remove( owner );
  }

  void reward::changercpt( eosio::name owner, eosio::name recipient ) {
    if ( !eosio::has_auth( owner ) && !eosio::has_auth( get_self() ) ) {
      eosio::check( false, "Missing required authority" );
    }

    voters{ get_self() }.on_changercpt( owner, recipient );
  }

  void reward::claim( eosio::name owner ) {
    require_auth( owner );

    voters voters( get_self() );
    voters.on_claim( owner );
  }
} // namespace edenproxy