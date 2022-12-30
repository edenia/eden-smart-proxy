#include <accounts.hpp>

namespace edenproxy {
  void accounts::on_init() { account_sing.get_or_create( contract ); }

  uint64_t accounts::get_balance( eosio::name account ) {
    return account_sing.get().balance;
  }

  bool accounts::has_funds( eosio::name account ) {
    return account_sing.get().balance > 0;
  }

  void accounts::add_balance( eosio::name account, eosio::asset amount ) {
    // TODO: remove account if not used
    auto acc_sing = account_sing.get();
    acc_sing.balance += amount;
    account_sing.set( acc_sing, contract );
  }

  void accounts::sub_balance( eosio::name account, eosio::asset amount ) {
    // TODO: remove account if not used
    auto acc_sing = account_sing.get();

    eosio::check( acc_sing.balance - amount >= 0, "Not enough funds" );

    acc_sing.balance -= amount;
    account_sing.set( acc_sing, contract );
  }

} // namespace edenproxy