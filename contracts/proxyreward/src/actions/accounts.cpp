#include <accounts.hpp>
#include <reward.hpp>

namespace edenproxy {
  void reward::notify_transfer( eosio::name         from,
                                eosio::name         to,
                                const eosio::asset &quantity,
                                std::string         memo ) {
    // TODO: validate token symbol
    accounts{ get_self() }.add_balance( quantity );
  }
} // namespace edenproxy