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

  bool admin::can_proxyvote() {
    auto state = st_sing.get();

    return std::get_if< state_ready_to_vote >( &state );
  }

  bool admin::can_refreshvotes() {
    auto state = st_sing.get();

    return std::get_if< state_standby >( &state );
  }

  void admin::set_standby() {
    auto state = st_sing.get();

    if ( auto *old_state = std::get_if< state_ready_to_vote >( &state ) ) {
      st_sing.set( state_standby{}, contract );
    } else if ( auto *old_state =
                    std::get_if< state_ban_community >( &state ) ) {
      st_sing.set( state_standby{}, contract );
    } else {
      eosio::check( false,
                    "Invariant failure: wrong state to set standby state" );
    }
  }

  void admin::set_bancommunity( eosio::name community ) {
    auto state = st_sing.get();

    if ( auto *old_state = std::get_if< state_standby >( &state ) ) {
      st_sing.set( state_ban_community{ .current_community = community },
                   contract );
    } else if ( auto *old_state =
                    std::get_if< state_ban_community >( &state ) ) {
      // do nothing
    } else {
      eosio::check( false, "Invariant failure: wrong state to set ban state" );
    }
  }

  void admin::set_updatevotes() {
    auto state = st_sing.get();

    if ( auto *old_state = std::get_if< state_standby >( &state ) ) {
      st_sing.set( state_update_votes{}, contract );
    } else if ( auto *old_state =
                    std::get_if< state_update_votes >( &state ) ) {
      // do nothing
    } else {
      eosio::check( false,
                    "Invariant failure: wrong state to set update state" );
    }
  }

  void admin::set_readytovote() {
    auto state = st_sing.get();

    if ( auto *old_state = std::get_if< state_update_votes >( &state ) ) {
      st_sing.set( state_ready_to_vote{}, contract );
    } else {
      eosio::check( false,
                    "Invariant failure: wrong state to set update state" );
    }
  }

  void admin::set_next_community( eosio::name next_community ) {
    auto state = st_sing.get();

    if ( auto *curr_state = std::get_if< state_update_votes >( &state ) ) {
      curr_state->current_community = next_community;
      st_sing.set( *curr_state, contract );
    }
  }

  bool admin::validate_community_ban( eosio::name community ) {
    auto state = st_sing.get();

    if ( auto *curr_state = std::get_if< state_ban_community >( &state ) ) {
      return curr_state->current_community == community;
    }

    return false;
  }

  // TODO: convert it to templace approach
  state_update_votes *admin::get_update_state() {
    auto state = st_sing.get();

    return std::get_if< state_update_votes >( &state );
  }

  // TODO: void clear_all();
} // namespace edenproxy