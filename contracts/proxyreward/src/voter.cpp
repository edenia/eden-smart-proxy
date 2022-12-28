#include <voter.hpp>

namespace edenproxy {
  int64_t get_staked_amount( eosio::name account ) {
    eosio_voters_table _voters( "eosio"_n, "eosio"_n.value );

    auto voters_itr = _voters.find( account.value );

    return voters_itr->staked;
  }

  eosio::name get_voter_proxy( eosio::name account ) {
    eosio_voters_table _voters( "eosio"_n, "eosio"_n.value );

    auto voters_itr = _voters.find( account.value );

    return voters_itr != _voters.end() ? voters_itr->proxy : eosio::name{};
  }

  bool is_vote_delegated( eosio::name owner ) {
    return PROXY_CONTRACT.value == get_voter_proxy( owner ).value;
  }

  void voters::update_voter_state( eosio::name owner, bool active ) {
    auto voter_itr = voter_tb.find( owner.value );

    voter_tb.modify( voter_itr, eosio::same_payer, [&]( auto &row ) {
      row.value = std::visit(
          [&]( auto &v ) { return active ? voter_v1{ v } : voter_v0{ v }; },
          row.value );
    } );
  }

  void voters::send_rewards( eosio::name owner ) {
    auto voter_itr = voter_tb.find( owner.value );

    if ( voter_itr->unclaimed() <= 0 ) {
      return;
    }

    auto payout =
        eosio::asset( voter_itr->unclaimed(), SUPPORTED_TOKEN_SYMBOL );

    voter_tb.modify( voter_itr, eosio::same_payer, [&]( auto &row ) {
      row.claimed() += payout.amount;
      row.unclaimed() = 0;
      row.last_claim_time() = eosio::current_time_point();
    } );

    // send tokens
    eosio::action( eosio::permission_level{ contract, "active"_n },
                   SUPPORTED_TOKEN_CONTRACT,
                   eosio::name( "transfer" ),
                   std::make_tuple( contract,
                                    voter_itr->recipient(),
                                    payout,
                                    "Reward for delegating your vote to: " +
                                        PROXY_CONTRACT.to_string() ) )
        .send();
  }

  void
  voters::update_data( eosio::name account, uint64_t staked, uint64_t reward ) {
    auto itr = voter_tb.find( account.value );

    voter_tb.modify( itr, eosio::same_payer, [&]( auto &row ) {
      row.staked() = staked;
      row.unclaimed() += reward;
      row.last_update_time() = eosio::current_time_point();
    } );
  }

  void voters::on_signup( eosio::name owner, eosio::name recipient ) {
    eosio::check( is_vote_delegated( owner ),
                  "Need to delegate the vote to " +
                      PROXY_CONTRACT.to_string() );
    eosio::check( eosio::is_account( recipient ), "Account does not exist" );

    auto voter_itr = voter_tb.find( owner.value );

    eosio::check( voter_itr == voter_tb.end(), "Voter already exist" );

    voter_tb.emplace( contract, [&]( auto &row ) {
      row.value = voter_v1{ { .owner = owner, .recipient = recipient } };
    } );
  }

  void voters::on_remove( eosio::name owner ) {
    auto voter_itr = voter_tb.find( owner.value );

    eosio::check( voter_itr != voter_tb.end(), "Voter does not exist" );

    // TODO: get next line working
    // update_voter( owner );
    send_rewards( owner );

    voter_tb.erase( voter_itr );
  }

  void voters::on_changercpt( eosio::name owner, eosio::name new_recipient ) {
    auto voter_itr = voter_tb.find( owner.value );

    eosio::check( voter_itr != voter_tb.end(), "Voter does not exist" );

    voter_tb.modify( voter_itr, eosio::same_payer, [&]( auto &row ) {
      row.recipient() = new_recipient;
    } );
  }

  void voters::on_claim( eosio::name owner ) {
    auto voter_itr = voter_tb.find( owner.value );

    eosio::check( voter_itr != voter_tb.end(), "Voter does not exist" );
    eosio::check( voter_itr->unclaimed() > 0, "No funds to claim" );

    send_rewards( owner );
  }
} // namespace edenproxy