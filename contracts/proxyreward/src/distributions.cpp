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

    eosio::check( accounts{ get_self() }.has_funds(),
                  "Not enough funds to cover user rewards" );

    if ( auto *dist = get_if< next_distribution >( &dist_sing ) ) {
      if ( dist->distribution_time() <= eosio::current_time_point() ) {
        accounts accounts( contract );
        voters   voters( contract );
        auto    &voter_table = voters.get_table();

        auto new_dist = prepare_distribution{ { *dist } };
        new_dist.next_account = voter_table.begin();
        new_dist.total_distribution = accounts.get_balance();
        distribution_sing.set( new_dist, contract );

        return true;
      }
    }

    return false;
  }

  void distributions::update_voters( uint32_t             &max_steps,
                                     prepare_distribution &prep_dist ) {
    voters  voters( contract );
    auto   &voter_table = voters.get_table();
    auto    voter_itr = voter_table.find( prep_dist->next_account().value );
    int64_t total_staked = 0;

    for ( ; voter_itr != voter_table.end() && max_steps > 0;
          ++voter_itr, --max_steps ) {
      // TODO: move the inactive voter to another scope to avoid
      // validating if they are active when calculating the reward
      if ( is_vote_delegated( voter_itr->owner() ) ) {
        voters.update_voter_state( voter_itr->owner(), true );
        int64_t staked_by_account =
            voters.get_staked_amount( voter_itr->owner() );
        voters.set_staked( voter_itr->owner(), staked_by_account, reward );
        total_staked += staked_by_account;
      } else {
        voters.update_voter_state( voter_itr->owner(), false );
      }
    }

    if ( voter_itr->owner() != prep_dist->next_account() ) {
      prep_dist.next_account() =
          voter_itr != voter_table.end() ? ++voter_itr : eosio::name{};
    }

    prep_dist.total_staked() += total_staked;
    distribution_sing.set( prep_dist, contract );
  }

  uint32_t distributions::distribute_daily( uint32_t max_steps ) {
    if ( max_steps && setup_distribution() ) {
      --max_steps;
    }

    if ( auto *dist = get_if< prepare_distribution >( &dist_sing ) ) {
      update_voters( max_steps );

      if ( dist->next_account() == eosio::name{} ) {
        distribution_sing.set( current_distribution{ { *dist } }, contract );
      } else {
        return max_steps;
      }
    }

    if ( auto *dist = get_if< current_distribution >( &dist_sing ) ) {
      voters voters( contract );
      auto  &voter_table = voters.get_table();
      auto   voter_itr = voter_table.find( dist->next_account().value );
      auto   total_distributed = eosio::asset( 0, SUPPORTED_TOKEN_SYMBOL );

      for ( ; voter_itr != end_itr && max_steps > 0;
            ++voter_itr, --max_steps ) {
        if ( auto *itr = std::get_if< voter_v1 >( &voter_itr->value ) ) {
          auto         staked_by_account = voters.get_staked_amount( owner );
          eosio::asset reward =
              eosio::asset( staked_by_account * dist->total_distribution,
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
                                          eosio::current_time_point(), ) )
              .send();
        }
      }

      if ( voter_itr == voter_table.end() ) {
        distribution_sing.set(
            next_distribution{ .distribution_time =
                                   dist->distribution_time + eosio::days( 1 ) },
            contract );

        accounts{ contract }.sub_balance( reward );
      } else if ( voter_itr->account() != dist->next_account() ) {
        prep_dist.next_account() = ++voter_itr;
      }
    }

    return max_steps;
  }
} // namespace edenproxy