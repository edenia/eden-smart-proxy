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

  void reward::changercpt( eosio::name owner,
                           eosio::name recipient,
                           bool        admin = false ) {
    if ( admin ) {
      require_auth( get_self() );

      eosio::check( recipient == eosio::name{}, "Admin can only ban" );
    } else {
      require_auth( owner );

      if ( recipient == eosio::name{} ) {
        recipient = DEFAULT_FUNDING_CONTRACT;
      } else {
        eosio::check( eosio::is_account( recipient ),
                      "Recipient is not an account" );
      }
    }

    voters{ get_self() }.on_changercpt( owner, recipient, admin );
  }

  void reward::claim( eosio::name owner ) {
    require_auth( owner );

    voters voters( get_self() );
    voters.on_claim( owner );
  }
} // namespace edenproxy