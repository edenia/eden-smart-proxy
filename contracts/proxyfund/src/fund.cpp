#include <fund.hpp>

namespace fund {
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

    eosio::require_recipient( reward_contract );
  }
} // namespace fund

EOSIO_ACTION_DISPATCHER( fund::actions )

EOSIO_ABIGEN( actions( fund::actions ) )