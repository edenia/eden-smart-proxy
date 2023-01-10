#include <accounts.hpp>
#include <distributions.hpp>
#include <voters.hpp>

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

    eosio::check( accounts{ contract }.has_funds(),
                  "Not enough funds to cover the rewards" );

    if ( auto *dist = std::get_if< next_distribution >( &dist_sing ) ) {
      // TODO: validate if there is accounts to distribute
      if ( dist->distribution_time.sec_since_epoch() <=
           eosio::current_time_point().sec_since_epoch() ) {
        voters voters( contract );
        auto   new_dist = prepare_distribution{ { *dist } };
        new_dist.next_account = voters.get_table().begin()->owner();
        new_dist.total_distribution = accounts( contract ).get_balance();
        distribution_sing.set( new_dist, contract );

        return true;
      }
    }

    return false;
  }

  void distributions::update_voters( uint32_t             &max_steps,
                                     prepare_distribution &prep_dist ) {
    eosio::print( "\n\nUPDATE_VOTERS\n" );
    voters   voters( contract );
    auto    &voter_table = voters.get_table();
    auto     voter_itr = voter_table.find( prep_dist.next_account.value );
    uint64_t total_staked = 0;

    for ( ; voter_itr != voter_table.end() && max_steps > 0;
          ++voter_itr, --max_steps ) {
      eosio::print( "OWNER: ", voter_itr->owner().to_string(), "\n" );
      // TODO: move the inactive voter to another scope to avoid
      // validating if they are active when calculating the reward
      if ( is_vote_delegated( voter_itr->owner() ) ) {
        eosio::print( "VOTER IS ACTIVE\n" );
        // voters.update_voter_state( voter_itr->owner(), true );
        int64_t staked_by_account = get_staked_amount( voter_itr->owner() );
        eosio::print( "STAKED_BY_ACCOUNT: ",
                      std::to_string( staked_by_account ),
                      "\n" );
        voters.set_staked( voter_itr->owner(), staked_by_account );
        total_staked += staked_by_account > 0
                            ? static_cast< uint64_t >( staked_by_account )
                            : 0;
      } else {
        eosio::print( "VOTER IS INACTIVE\n" );
        voters.update_voter_state( voter_itr->owner(), false );
      }
      eosio::print( "\n" );
    }

    prep_dist.next_account =
        voter_itr != voter_table.end() ? voter_itr->owner() : eosio::name( -1 );
    prep_dist.total_staked.amount += total_staked;
    distribution_sing.set( prep_dist, contract );
    eosio::print( "PREP_DIST.NEXT_ACCOUNT: ",
                  prep_dist.next_account.to_string(),
                  "\n" );
    eosio::print( "PREP_DIST.TOTAL_STAKED: ",
                  prep_dist.total_staked.to_string(),
                  "\n\n" );
  }

  void distributions::distribute_rewards( uint32_t             &max_steps,
                                          current_distribution &curr_dist ) {
    eosio::print( "\n\nDISTRIBUTE_REWARDS\n" );
    // TODO: move this block of code to a new function
    voters voters( contract );
    auto  &voter_table = voters.get_table();
    auto   voter_itr = voter_table.find( curr_dist.next_account.value );
    auto   end_itr = voter_table.end();
    auto   total_distributed = eosio::asset( 0, SUPPORTED_TOKEN_SYMBOL );
    eosio::print( "TOTAL_STAKED: ", curr_dist.total_staked.to_string(), "\n" );

    for ( ; voter_itr != end_itr && max_steps > 0; ++voter_itr, --max_steps ) {
      eosio::print( "OWNER: ", voter_itr->owner().to_string(), "\n" );
      // TODO: look for a solution to avoid to valide if the use is active
      if ( auto *itr = std::get_if< voter_v1 >( &voter_itr->value ) ) {
        eosio::print( "VOTER IS ACTIVE\n" );
        auto staked_by_account = get_staked_amount( itr->owner );
        eosio::print( "STAKED_BY_ACCOUNT: ",
                      std::to_string( staked_by_account ),
                      "\n" );
        eosio::asset reward = staked_by_account * curr_dist.total_distribution;
        reward /= curr_dist.total_staked.amount;
        eosio::print( "REWARD: ", reward.to_string(), "\n" );
        voters.add_reward( itr->owner, reward.amount );
        total_distributed += reward;

        eosio::action(
            eosio::permission_level{ contract, "active"_n },
            contract,
            "receipt"_n,
            std::tuple( itr->owner,
                        reward,
                        eosio::asset( itr->staked, SUPPORTED_TOKEN_SYMBOL ),
                        eosio::asset( itr->unclaimed, SUPPORTED_TOKEN_SYMBOL ),
                        eosio::time_point_sec( eosio::current_time_point() ) ) )
            .send();
      } else {
        eosio::print( "VOTER IS INACTIVE\n" );
      }
    }

    accounts{ contract }.sub_balance( total_distributed );
    curr_dist.next_account =
        voter_itr != voter_table.end() ? voter_itr->owner() : eosio::name( -1 );
    distribution_sing.set( curr_dist, contract );
    eosio::print( "CURR_DIST.NEXT_ACCOUNT: ",
                  curr_dist.next_account.to_string(),
                  "\n\n" );
  }

  uint32_t distributions::distribute_daily( uint32_t max_steps ) {
    if ( max_steps && setup_distribution() ) {
      --max_steps;
    }

    auto distribution = distribution_sing.get();

    if ( auto *dist = get_if< prepare_distribution >( &distribution ) ) {
      update_voters( max_steps, *dist );

      if ( dist->next_account == eosio::name( -1 ) ) {
        dist->next_account = voters( contract ).get_table().begin()->owner();
        distribution_sing.set( current_distribution{ { *dist } }, contract );
      }
    }

    distribution = distribution_sing.get();

    if ( auto *dist = get_if< current_distribution >( &distribution ) ) {
      distribute_rewards( max_steps, *dist );

      if ( dist->next_account == eosio::name( -1 ) ) {
        distribution_sing.set(
            next_distribution{ .distribution_time =
                                   dist->distribution_time + eosio::days( 1 ) },
            contract );
      }
    }

    return max_steps;
  }

  struct next_distribution distributions::distribution() {

    return std::visit(
        []( const auto &dist ) { return next_distribution{ dist }; },
        distribution_sing.get_or_default() );
  }
} // namespace edenproxy