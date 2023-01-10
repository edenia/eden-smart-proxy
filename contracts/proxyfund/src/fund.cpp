#include <fund.hpp>

namespace eden {
  void funds::notify_transfer( eosio::name         from,
                               eosio::name         to,
                               const eosio::asset &quantity,
                               std::string         memo ) {
    // skip transactions that are not related
    if ( from == get_self() || to != get_self() ) {
      return;
    }

    eosio::check( token_contract == get_first_receiver(),
                  "Invalid token contract" );
    eosio::check( default_token_symbol == quantity.symbol,
                  "Invalid token symbol" );

    eosio::require_recipient( proxy_contract );
  }
} // namespace eden

EOSIO_ACTION_DISPATCHER( eden::actions )

EOSIO_ABIGEN( actions( eden::actions ) )