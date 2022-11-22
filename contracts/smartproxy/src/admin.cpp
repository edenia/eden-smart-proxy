#include <admin.hpp>
#include <smartproxy.hpp>

namespace edenproxy {
  void admin::on_banbp( eosio::name bp ) {
    auto blacklisted_itr = _blacklisted.find( bp.value );

    eosio::check( blacklisted_itr == _blacklisted.end(),
                  "BP is already blacklisted" );

    _blacklisted.emplace( contract, [&]( auto &row ) { row.bp = bp; } );
  }

  void admin::on_unbanbp( eosio::name bp ) {
    auto blacklisted_itr = _blacklisted.find( bp.value );

    eosio::check( blacklisted_itr != _blacklisted.end(),
                  "BP is not blacklisted" );

    _blacklisted.erase( blacklisted_itr );
  }

  bool admin::is_blacklisted( eosio::name bp ) {
    auto blacklisted_itr = _blacklisted.find( bp.value );

    return blacklisted_itr != _blacklisted.end();
  }

  // void clear_all();
} // namespace edenproxy