#pragma once

#include <eosio/asset.hpp>
#include <eosio/name.hpp>

namespace fund {
  inline constexpr auto token_contract = "eosio.token"_n;
  inline constexpr auto reward_contract = "edenproxyrwd"_n;
  inline constexpr auto default_token_symbol = eosio::symbol( "EOS", 4 );

} // namespace fund