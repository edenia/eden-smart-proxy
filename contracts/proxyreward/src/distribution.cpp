#include <distribution.hpp>
#include <voter.hpp>

namespace edenproxy {
  bool distributions::update_voter( eosio::name owner ) {
    voters voters( contract );
    auto  &voter_table = voters.get_table();
    auto   voter_itr = voter_table.find( owner.value );

    bool is_active = is_vote_delegated( owner );

    if ( auto *itr = std::get_if< voter_v1 >( &voter_itr->value ) ) {
      if ( !is_active ) {
        voters.update_voter_state( owner, false );
        return false;
      }

      // settings_singleton settings_sing( contract, contract.value );
      // auto     settings = std::get< settings_v0 >( settings_sing.get() );
      auto     staked_by_account = get_staked_amount( owner );
      uint64_t reward = staked_by_account / 10000 / 365;
      //uint64_t reward = (staked_by_account / total amount staked) * Daily inflation directed to proxy from network.

      auto elapse = eosio::current_time_point().sec_since_epoch() -
                    itr->last_update_time.sec_since_epoch();

      voters.update_data( voter_itr->owner(), staked_by_account, reward );

      eosio::action( eosio::permission_level{ contract, "active"_n },
                     contract,
                     "receipt"_n,
                     std::make_tuple( elapse,
                                      itr->last_claim_time,
                                      itr->owner,
                                      reward,
                                      itr->staked,
                                      itr->unclaimed ) )
          .send();

      return true;
    } else {
      if ( is_active ) {
        voters.update_voter_state( owner, false );
      }

      return false;
    }
  }

  void distributions::on_init() {
    eosio::check( !distribution_sing.exists(),
                  "Contract is already initialized" );

    distribution_sing.get_or_create(
        contract,
        next_distribution{ .distribution_time = eosio::current_time_point() +
                                                eosio::days( 1 ) } );
  }

  uint32_t distributions::on_updateall( uint32_t max_steps ) {
    auto ctp = eosio::current_time_point();

    voters voters( contract );
    auto  &voter_table = voters.get_table();

    auto voter_index = voter_table.get_index< eosio::name( "bylastupdate" ) >();
    auto end_itr = voter_index.upper_bound( ctp.sec_since_epoch() );

    for ( auto voter_itr = voter_index.lower_bound( 0 );
          max_steps > 0 && voter_itr != end_itr;
          voter_itr = voter_index.lower_bound( 0 ) ) {
      if ( update_voter( voter_itr->owner() ) ) {
        --max_steps;
      }
    }

    return max_steps;
  }
} // namespace edenproxy