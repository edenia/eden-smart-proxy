#include <distribution.hpp>
#include <voter.hpp>

namespace edenproxy {
  void distributions::on_init() {
    eosio::check( !distribution_sing.exists(),
                  "Contract is already initialized" );

    distribution_sing.get_or_create(
        contract,
        next_distribution{ .distribution_time = eosio::current_time_point() +
                                                eosio::days( 1 ) } );
  }

  bool distributions::setup_distribution() {
    auto dist_sing = distribution_sing.get();

    if ( auto *dist = get_if< next_distribution >( &dist_sing ) ) {
      if ( dist->distribution_time() <= eosio::current_time_point() ) {
        distribution_sing.set( prepare_distribution{ { *dist } }, contract );

        return true;
      }
    }

    return false;
  }

  void distributions::update_voters( uint32_t             &max_steps,
                                     prepare_distribution &prep_dist ) {

    voters voters( contract );
    auto  &voter_table = voters.get_table();
    auto   voter_itr = prep_dist->next_account() != eosio::name{}
                           ? voter_table.find( prep_dist->next_account().value )
                           : voter_table.begin();
    for ( ; voter_itr != voter_table.end(); ++voter_itr, --max_steps ) {
      // TODO: check voter is active, if not, activate them
      if ( is_vote_delegated( voter_itr->owner() ) ) {
        int64_t staked_by_account =
            voters.get_staked_amount( voter_itr->owner() );
        voters.set_staked( voter_itr->owner(), staked_by_account, reward );
      } else {
        voters.update_voter_state( voter_itr->owner(), false );
      }
    }

    if ( voter_itr != voter_table.end() ) {
      prep_dist.next_account = voter_itr->owner();
      distribution_sing.set( prep_dist, contract );
    }

    // inactive a voter if they stopped staking or delegating the vote to the edensmartprx
  }

  uint32_t distributions::distribute_daily( uint32_t max_steps ) {
    if ( max_steps && setup_distribution() ) {
      --max_steps;
    }

    if ( auto *dist = get_if< prepare_distribution >( &dist_sing ) ) {
      update_voters( max_steps );

      if ( max_steps > 0 || dist->next_account() == eosio::name{} ) {
        distribution_sing.set( current_distribution{ { *dist } }, contract );
      }
    }

    if ( max_steps <= 0 ) {
      return max_steps;
    }

    if ( auto *dist = get_if< current_distribution >( &dist_sing ) ) {
      // next_account
      auto   ctp = eosio::current_time_point();
      voters voters( contract );
      auto  &voter_table = voters.get_table();
      auto   voter_itr = voter_table.find( dist->next_account().value );

      for ( ; voter_itr != end_itr && max_steps > 0;
            ++voter_itr, --max_steps ) {
        // TODO: update next line to a function in the voter file
        if ( auto *itr = std::get_if< voter_v1 >( &voter_itr->value ) ) {
          auto     staked_by_account = voters.get_staked_amount( owner );
          uint64_t reward = staked_by_account / 10000 / 365;
          voters.add_reward( voter_itr->account(), reward );
          //uint64_t reward = (staked_by_account / total amount staked) * Daily inflation directed to proxy from network.

          eosio::action( eosio::permission_level{ contract, "active"_n },
                         contract,
                         "receipt"_n,
                         std::make_tuple( itr->owner,
                                          reward,
                                          itr->staked,
                                          itr->unclaimed,
                                          itr->last_claim_time, ) )
              .send();

          return true;
        }
      }
    }

    return max_steps;
  }
} // namespace edenproxy