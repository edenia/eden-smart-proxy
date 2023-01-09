#pragma once

#include <eosio/asset.hpp>
#include <eosio/name.hpp>

namespace edenproxy {
  inline constexpr auto token_contract = "eosio.token"_n;
  inline constexpr auto proxy_contract = "edensmartprx"_n;
  inline constexpr auto default_token_symbol = eosio::symbol( "EOS", 4 );

} // namespace edenproxy