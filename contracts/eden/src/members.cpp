#include <eden/members.hpp>

namespace eden {

  const member &members::get_member( eosio::name account ) {
    return member_tb.get(
        account.value,
        ( "member " + account.to_string() + " not found" ).c_str() );
  }

  void members::check_active_member( eosio::name account ) {
    eosio::check( get_member( account ).status() ==
                      member_status::active_member,
                  "inactive member " + account.to_string() );
  }

  void members::check_pending_member( eosio::name account ) {
    eosio::check( get_member( account ).status() ==
                      member_status::pending_membership,
                  "member " + account.to_string() + " is not pending" );
  }

  void members::create( eosio::name account ) {
    member_tb.emplace( contract, [&]( auto &row ) {
      row.account() = account;
      row.status() = member_status::pending_membership;
      row.nft_template_id() = 0;
    } );
  }

  void members::setactive( eosio::name account, const std::string &name ) {
    check_pending_member( account );
    member_tb.modify( member_tb.get( account.value ),
                      eosio::same_payer,
                      [&]( auto &row ) {
                        row.value = member_v1{
                            { .account = row.account(),
                              .name = name,
                              .status = member_status::active_member,
                              .nft_template_id = row.nft_template_id(),
                              .election_participation_status = 0 } };
                      } );
  }

  void members::setinactive( eosio::name account ) {
    check_active_member( account );
    member_tb.modify( member_tb.get( account.value ),
                      eosio::same_payer,
                      [&]( auto &row ) {
                        row.value = member_v1{
                            { .account = row.account(),
                              .name = row.name(),
                              .status = member_status::pending_membership,
                              .nft_template_id = row.nft_template_id(),
                              .election_participation_status = 0 } };
                      } );
  }

  void members::setrank( eosio::name member,
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

  void members::setstats( std::vector< uint16_t > ranks ) {
    auto stats = this->stats();
    ++stats.pending_members;
    stats.ranks = ranks;
    eosio::check( stats.pending_members != 0, "Integer overflow" );
    member_stats.set( stats, contract );
  }

  struct member_stats_v1 members::stats() {
    return std::visit(
        []( const auto &stats ) { return member_stats_v1{ stats }; },
        member_stats.get_or_default() );
  }
} // namespace eden
