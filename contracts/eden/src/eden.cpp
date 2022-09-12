#include <eden/eden.hpp>

namespace eden {
  // const member &members_contract::get_member( eosio::name account ) {
  //   return member_tb.get(
  //       account.value,
  //       ( "member " + account.to_string() + " not found" ).c_str() );
  // }

  void members_contract::check_active_member( eosio::name account ) {
    eosio::check( get_member( account ).status() ==
                      member_status::active_member,
                  "inactive member " + account.to_string() );
  }

  void members_contract::check_pending_member( eosio::name account ) {
    eosio::check( get_member( account ).status() ==
                      member_status::pending_membership,
                  "member " + account.to_string() + " is not pending" );
  }

  void members_contract::create( eosio::name account ) {
    member_tb.emplace( contract, [&]( auto &row ) {
      row.account() = account;
      row.status() = member_status::pending_membership;
      row.nft_template_id() = 0;
    } );
  }

  void members_contract::setactive( eosio::name        account,
                                    const std::string &name ) {
    check_pending_member( account );
    const auto &member = get_member( account );
    member_tb.modify( member, eosio::same_payer, [&]( auto &row ) {
      row.value = member_v1{ { .account = row.account(),
                               .name = name,
                               .status = member_status::active_member,
                               .nft_template_id = row.nft_template_id(),
                               .election_participation_status = 0 } };
    } );
  }

  void members_contract::set_rank( eosio::name member,
                                   uint8_t     rank,
                                   eosio::name representative ) {
    member_tb.modify(
        member_tb.get( member.value ),
        contract,
        [&]( auto &row ) {
          row.value =
              std::visit( []( auto &v ) { return member_v1{ v }; }, row.value );
          row.election_rank() = rank;
          row.representative() = representative;
          row.election_participation_status() = 0;
        } );
  }
} // namespace eden

EOSIO_ACTION_DISPATCHER( eden::actions )

EOSIO_ABIGEN( actions( eden::actions ) )