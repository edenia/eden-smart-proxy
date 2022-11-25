#include <admin.hpp>
#include <smartproxy.hpp>

namespace edenproxy {
  void admin::on_ban( eosio::name account ) {
    auto blacklisted_itr = _blacklisted.find( account.value );

    eosio::check( blacklisted_itr == _blacklisted.end(),
                  "Account is already blacklisted" );

    _blacklisted.emplace( contract,
                          [&]( auto &row ) { row.account() = account; } );
  }

  void admin::on_unban( eosio::name account ) {
    auto blacklisted_itr = _blacklisted.find( account.value );

    eosio::check( blacklisted_itr != _blacklisted.end(),
                  "Account is not blacklisted" );

    _blacklisted.erase( blacklisted_itr );
  }

  bool admin::is_blacklisted( eosio::name account ) {
    auto blacklisted_itr = _blacklisted.find( account.value );

    return blacklisted_itr != _blacklisted.end();
  }

  // void clear_all();
} // namespace edenproxy