#pragma once

#include <eosio/asset.hpp>

namespace edenproxy {
  inline constexpr auto PROXY_CONTRACT = eosio::name( "edensmartprx" );
  inline constexpr auto SUPPORTED_TOKEN_CONTRACT = eosio::name( "eosio.token" );
  inline constexpr auto SUPPORTED_TOKEN_SYMBOL = eosio::symbol( "EOS", 4 );
} // namespace edenproxy