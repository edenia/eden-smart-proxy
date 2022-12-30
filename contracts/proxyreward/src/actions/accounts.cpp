#include <accounts.hpp>
#include <reward.hpp>

namespace edenproxy {
  void reward::transfer( eosio::name         from,
                         eosio::name         to,
                         const eosio::asset &quantity,
                         std::string         memo ) {
    accounts{ get_self() }.add_balance( quantity );
  }
} // namespace edenproxy