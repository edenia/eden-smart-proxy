#include <accounts.hpp>
#include <reward.hpp>

namespace edenproxy {
  void reward::notify_transfer( eosio::name         from,
                                eosio::name         to,
                                const eosio::asset &quantity,
                                std::string         memo ) {
    // TODO: to = edenprxfunds || to = edenproxyrwd

    // token symbol is already validated in the funds contract, if the
    // notified transaction gets here, it's a valid transfer and comes from
    // a trusted contract only which is `default_funding_contract`

    accounts{ get_self() }.add_balance( quantity );
  }
} // namespace edenproxy