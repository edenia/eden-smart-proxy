#include <smartproxy.hpp>
#include <voters.hpp>

namespace edenproxy {
  void edenproxy_contract::vote( eosio::name                       voter,
                                 const std::vector< eosio::name > &producers ) {
    require_auth( voter );

    voters{ get_self() }.member_vote( voter, producers );
  }

  void edenproxy_contract::rmvote( eosio::name voter ) {
    require_auth( voter );

    voters{ get_self() }.on_rmvote( voter );
  }

  void edenproxy_contract::proxyvote() {
    require_auth( get_self() );

    voters{ get_self() }.on_proxyvote();
  }

  void edenproxy_contract::refreshvotes( uint32_t max_steps, bool flag ) {
    require_auth( get_self() );

    voters{ get_self() }.on_refreshvotes( max_steps, flag );
  }
} // namespace edenproxy