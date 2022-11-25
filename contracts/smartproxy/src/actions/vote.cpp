#include <smartproxy.hpp>
#include <voters.hpp>

namespace edenproxy {
  // TODO: add community to this action parameter
  void edenproxy::vote( eosio::name                       voter,
                        const std::vector< eosio::name > &producers ) {
    require_auth( voter );

    voters{ get_self(), get_self().value }.member_vote( voter, producers );
  }

  // TODO: add community to this action parameter
  void edenproxy::rmvote( eosio::name voter ) {
    require_auth( voter );

    voters{ get_self(), get_self().value }.on_rmvote( voter );
  }

  void edenproxy::proxyvote() {
    require_auth( get_self() );

    voters{ get_self(), get_self().value }.on_proxyvote();
  }

  void edenproxy::refreshvotes( uint32_t max_steps, bool flag ) {
    require_auth( get_self() );

    voters{ get_self(), get_self().value }.on_refreshvotes( max_steps, flag );
  }
} // namespace edenproxy