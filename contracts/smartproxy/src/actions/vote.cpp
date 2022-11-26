#include <admin.hpp>
#include <smartproxy.hpp>
#include <voters.hpp>

namespace edenproxy {
  void edenproxy::vote( eosio::name                       voter,
                        eosio::name                       community,
                        const std::vector< eosio::name > &producers ) {
    require_auth( voter );

    voters{ get_self(), community.value }.member_vote( voter, producers );
  }

  void edenproxy::rmvote( eosio::name voter, eosio::name community ) {
    require_auth( voter );

    voters{ get_self(), community.value }.on_rmvote( voter );
  }

  void edenproxy::proxyvote() {
    admin  admin{ get_self() };
    voters voters{ get_self(), get_self().value };

    eosio::check( admin.can_proxyvote(),
                  "The smart contract is not ready for voting yet" );

    voters.on_proxyvote();
    admin.set_standby();
  }

  void edenproxy::refreshvotes( uint32_t max_steps ) {
    admin  admin{ get_self() };
    auto  *state = admin.get_update_state();
    voters voters{ get_self(), state->current_community.value };

    eosio::check(
        admin.can_refreshvotes(),
        "The smart contract must be on standby to start updating the votes" );

    admin.set_updatevotes();
    uint32_t remaining_steps = voters.on_refreshvotes( max_steps );

    if ( remaining_steps != 0 ) {
      eosio::check( remaining_steps != max_steps, "Nothing to do" );

      admin.set_readytovote();
    }
  }
} // namespace edenproxy