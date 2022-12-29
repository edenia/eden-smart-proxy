#include <accounts.hpp>
#include <distributions.hpp>
#include <voters.hpp>

namespace edenproxy {
  void distributions::on_init() {
    eosio::check( !distribution_sing.exists() && !account_sing.exists(),
                  "Contract is already initialized" );

    distribution_sing.get_or_create(
        contract,
        next_distribution{ .distribution_time = eosio::current_time_point() +
                                                eosio::days( 1 ) } );
    account_sing.get_or_create(
        contract,
        account_v0{ .balance = eosio::asset( 0, SUPPORTED_TOKEN_SYMBOL ) } );
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
    voters  voters( contract );
    auto   &voter_table = voters.get_table();
    auto    voter_itr = prep_dist->next_account() != eosio::name{}
                            ? voter_table.find( prep_dist->next_account().value )
                            : voter_table.begin();
    int64_t total_staked = 0;

    for ( ; voter_itr != voter_table.end(); ++voter_itr, --max_steps ) {
      // TODO: check voter is active, if not, activate them
      // considerer voting the voter to another scope to avoid
      // validating if they are active or not when calculating the reward
      if ( is_vote_delegated( voter_itr->owner() ) ) {
        int64_t staked_by_account =
            voters.get_staked_amount( voter_itr->owner() );
        voters.set_staked( voter_itr->owner(), staked_by_account, reward );
        total_staked += staked_by_account;
      } else {
        voters.update_voter_state( voter_itr->owner(), false );
      }
    }

    prep_dist.total_staked() += total_staked;
    distribution_sing.set( prep_dist, contract );

    if ( voter_itr != voter_table.end() ) {
      prep_dist.next_account() = voter_itr->owner();
      distribution_sing.set( prep_dist, contract );
    }
  }

  uint32_t distributions::distribute_daily( uint32_t max_steps ) {
    if ( max_steps && setup_distribution() ) {
      --max_steps;
    }

    // TODO: validate that rewards are ready to distribute once the contract have received
    // the funds from eosio
    // TODO: take an snapshot of the funds to distribute since while distributing
    // the account could receive more funds
    if ( auto *dist = get_if< prepare_distribution >( &dist_sing ) ) {
      update_voters( max_steps );

      if ( max_steps > 0 || dist->next_account() == eosio::name{} ) {
        distribution_sing.set( current_distribution{ { *dist } }, contract );
      } else {
        return max_steps;
      }
    }

    if ( auto *dist = get_if< current_distribution >( &dist_sing ) ) {
      accounts accounts( contract );
      voters   voters( contract );
      auto    &voter_table = voters.get_table();
      auto     voter_itr = voter_table.find( dist->next_account().value );
      auto     total_distributed = eosio::asset( 0, SUPPORTED_TOKEN_SYMBOL );

      for ( ; voter_itr != end_itr && max_steps > 0;
            ++voter_itr, --max_steps ) {
        // TODO: update next line to a function in the voter file to validate if the voter is active or not
        if ( auto *itr = std::get_if< voter_v1 >( &voter_itr->value ) ) {
          auto staked_by_account = voters.get_staked_amount( owner );
          // reward = (staked_by_account / total amount staked) * Daily inflation directed to proxy from network.
          // TODO: instead of reading from account_sing.get().balance read it from distribution snapshot
          eosio::asset reward =
              eosio::asset( staked_by_account * account_sing.get().balance,
                            SUPPORTED_TOKEN_SYMBOL );
          reward /= dist->total_staked();
          voters.add_reward( voter_itr->account(), reward );
          total_distributed += reward;

          eosio::action( eosio::permission_level{ contract, "active"_n },
                         contract,
                         "receipt"_n,
                         std::make_tuple( itr->owner,
                                          reward,
                                          itr->staked,
                                          itr->unclaimed,
                                          itr->last_claim_time, ) )
              .send();
        }
      }

      accounts.sub_balance( SELF_ACCOUNT, reward );
    }

    return max_steps;
  }
} // namespace edenproxy