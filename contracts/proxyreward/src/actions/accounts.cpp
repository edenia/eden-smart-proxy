#include <accounts.hpp>
#include <reward.hpp>

namespace edenproxy {
  void reward::notify_transfer( eosio::name         from,
                                eosio::name         to,
                                const eosio::asset &quantity,
                                std::string         memo ) {
    // skip transactions that are not related
    // ignore transfers to self and transfers that are not to the default funding contract

    // validate transfers would be:
    // 1. from != get_self()
    // 2. to != get_self() && to == default_funding_contract

    if ( from == get_self() ||
         ( to == get_self() || to != default_funding_contract ) ) {
      return;
    }

    eosio::check( SUPPORTED_TOKEN_CONTRACT == get_first_receiver(),
                  "Invalid token contract" );
    eosio::check( SUPPORTED_TOKEN_SYMBOL == quantity.symbol,
                  "Invalid token symbol" );

    accounts{ get_self() }.add_balance( quantity );
  }
} // namespace edenproxy