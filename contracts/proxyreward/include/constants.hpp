#pragma once

#include <eosio/asset.hpp>

namespace edenproxy {
  inline constexpr auto SELF_ACCOUNT = "master"_n;
  inline constexpr auto PROXY_CONTRACT = "edensmartprx"_n;
  inline constexpr auto SUPPORTED_TOKEN_CONTRACT = "eosio.token"_n;
  inline constexpr auto SUPPORTED_TOKEN_SYMBOL = eosio::symbol( "EOS", 4 );
  inline constexpr auto DEFAULT_FUNDING_CONTRACT = "edenprxfunds"_n;
} // namespace edenproxy