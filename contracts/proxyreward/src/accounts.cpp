#include <accounts.hpp>

namespace edenproxy {
  void accounts::on_init() {
    eosio::check( !account_sing.exists(), "Contract is already initialized" );

    account_sing.get_or_create(
        contract,
        account_v0{ .balance = eosio::asset( 0, SUPPORTED_TOKEN_SYMBOL ) } );
  }

  eosio::asset accounts::get_balance() {
    auto account = this->account();

    return account.balance;
  }

  bool accounts::has_funds() {
    auto account = this->account();

    return account.balance.amount > 0;
  }

  void accounts::add_balance( eosio::asset amount ) {
    auto account = this->account();

    account.balance += amount;
    account_sing.set( account, contract );
  }

  void accounts::sub_balance( eosio::asset amount ) {
    auto account = this->account();

    eosio::check( ( account.balance - amount ).amount >= 0,
                  "Not enough funds" );

    account.balance -= amount;
    account_sing.set( account, contract );
  }

  struct account_v0 accounts::account() {

    return std::visit( []( const auto &acc ) { return account_v0{ acc }; },
                       account_sing.get_or_default() );
  }

} // namespace edenproxy