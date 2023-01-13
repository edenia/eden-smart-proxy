#include <distributions.hpp>
#include <voters.hpp>

namespace edenproxy {
  int64_t get_staked_amount( eosio::name account ) {
#ifdef ENABLE_TESTING_BYPASS
    return 500000;
#endif

    eosio_voters_table _voters( "eosio"_n, "eosio"_n.value );

    auto voters_itr = _voters.find( account.value );

    return voters_itr->staked;
  }

  eosio::name get_voter_proxy( eosio::name account ) {
    eosio_voters_table _voters( "eosio"_n, "eosio"_n.value );
    auto               voters_itr = _voters.find( account.value );

    return voters_itr != _voters.end() ? voters_itr->proxy : eosio::name{};
  }

  bool is_vote_delegated( eosio::name owner ) {
#ifdef ENABLE_TESTING_BYPASS
    return true;
#endif
    return PROXY_CONTRACT == get_voter_proxy( owner );
  }

  void voters::activate( eosio::name owner ) {
    auto voter_itr = voter_tb_inactive.find( owner.value );

    if ( voter_itr != voter_tb_inactive.end() ) {
      voter_tb.emplace( contract, [&]( auto &row ) {
        row.value = std::visit( [&]( auto &v ) { return voter_v1{ v }; },
                                voter_itr->value );
      } );

      voter_tb_inactive.erase( voter_itr );
    }
  }

  void voters::deactivate( eosio::name owner ) {
    auto voter_itr = voter_tb.find( owner.value );

    if ( voter_itr != voter_tb.end() ) {

      voter_tb_inactive.emplace( contract, [&]( auto &row ) {
        row.value = std::visit( [&]( auto &v ) { return voter_v0{ v }; },
                                voter_itr->value );
      } );

      voter_tb.erase( voter_itr );
    }
  }

  void voters::send_rewards( eosio::name owner, bool check = true ) {
    auto voter_itr = voter_tb.find( owner.value );

    if ( check ) {
      eosio::check( voter_itr->unclaimed() > 0, "No funds to claim" );
    }

    auto payout =
        eosio::asset( voter_itr->unclaimed(), SUPPORTED_TOKEN_SYMBOL );

    voter_tb.modify( voter_itr, eosio::same_payer, [&]( auto &row ) {
      row.claimed() += payout.amount;
      row.unclaimed() = 0;
      row.last_claim_time() = eosio::current_time_point();
    } );

// Bypass eosio::action for testing because of the reward permission that makes it fail
#ifndef ENABLE_TESTING_BYPASS
    eosio::action(
        eosio::permission_level{ default_funding_contract, "reward"_n },
        SUPPORTED_TOKEN_CONTRACT,
        "transfer"_n,
        std::tuple( default_funding_contract,
                    voter_itr->recipient(),
                    payout,
                    "Reward for delegating your vote to: " +
                        PROXY_CONTRACT.to_string() ) )
        .send();
#endif
  }

  void voters::set_staked( eosio::name account, uint64_t staked ) {
    auto itr = voter_tb.find( account.value );

    voter_tb.modify( itr, eosio::same_payer, [&]( auto &row ) {
      row.staked() = staked;
    } );
  }

  void voters::add_reward( eosio::name account, uint64_t reward ) {
    auto itr = voter_tb.find( account.value );

    voter_tb.modify( itr, eosio::same_payer, [&]( auto &row ) {
      row.unclaimed() += reward;
    } );
  }

  bool voters::is_active( eosio::name owner ) {
    auto voter_itr = voter_tb.find( owner.value );

    return voter_itr != voter_tb.end();
  }

  bool voters::is_inactive( eosio::name owner ) {
    auto voter_itr = voter_tb_inactive.find( owner.value );

    return voter_itr != voter_tb_inactive.end();
  }

  bool voters::exist( eosio::name owner ) {
    return is_active( owner ) || is_inactive( owner );
  }

  void voters::on_signup( eosio::name owner, eosio::name recipient ) {
    eosio::check( is_vote_delegated( owner ),
                  "Need to delegate the vote to " +
                      PROXY_CONTRACT.to_string() );

    if ( recipient == eosio::name{} ) {
      recipient = default_funding_contract;
    } else {
      eosio::check( eosio::is_account( recipient ), "Account does not exist" );
    }

    auto voter_itr = voter_tb.find( owner.value );

    eosio::check( !is_active( owner ), "Voter already exist" );
    eosio::check( !is_inactive( owner ), "Voter is inactive" );

    voter_tb.emplace( contract, [&]( auto &row ) {
      row.value = voter_v1{ { .owner = owner, .recipient = recipient } };
    } );
  }

  void voters::check_resign( eosio::name owner ) {
    eosio::check( exist( owner ), "Voter does not exist" );

    auto voter_itr = is_active( owner ) ? voter_tb.find( owner.value )
                                        : voter_tb_inactive.find( owner.value );

    eosio::check( voter_itr->unclaimed() == 0,
                  "Need to claim the funds before to resign" );
  }

  void voters::remove( eosio::name owner ) {
    auto voter_itr = is_active( owner ) ? voter_tb.find( owner.value )
                                        : voter_tb_inactive.find( owner.value );
    voter_tb.erase( voter_itr );
  }

  void voters::on_changercpt( eosio::name owner,
                              eosio::name new_recipient,
                              bool        admin = false ) {
    eosio::check( !is_inactive( owner ),
                  "Cannot change the recipient of an inactive account" );

    auto voter_itr = voter_tb.find( owner.value );

    eosio::check( voter_itr != voter_tb.end(), "Voter does not exist" );

    if ( !admin ) {
      eosio::check( voter_itr->recipient() != eosio::name{},
                    "Your account has been block by admins" );
    }

    voter_tb.modify( voter_itr, eosio::same_payer, [&]( auto &row ) {
      row.recipient() = new_recipient;
    } );
  }

  void voters::on_claim( eosio::name owner ) {
    auto voter_itr = voter_tb.find( owner.value );

    eosio::check( exist( owner ), "Voter does not exist" );
    eosio::check( !is_inactive( owner ), "Your account is inactive" );
    eosio::check( voter_itr->recipient() != eosio::name{},
                  "Claiming has been blocked for " + owner.to_string() );

    send_rewards( owner );
  }
} // namespace edenproxy