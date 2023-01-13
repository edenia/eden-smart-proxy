#pragma once

#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>

#include <accounts.hpp>
#include <constants.hpp>
#include <distributions.hpp>
#include <voters.hpp>

namespace edenproxy {
  class reward : public eosio::contract {
  public:
    using eosio::contract::contract;

    reward( eosio::name                       receiver,
            eosio::name                       code,
            eosio::datastream< const char * > ds )
        : contract( receiver, code, ds ) {}

    void init();
    void signup( eosio::name owner, eosio::name recipient );
    void resign( eosio::name owner );
    void changercpt( eosio::name owner, eosio::name recipient, bool admin );
    void distribute( uint32_t max_steps );
    void claim( eosio::name owner );
    void receipt( eosio::name           owner,
                  eosio::asset          reward,
                  eosio::asset          staked,
                  eosio::asset          unclaimed,
                  eosio::time_point_sec distribution_time );

    void notify_transfer( eosio::name         from,
                          eosio::name         to,
                          const eosio::asset &quantity,
                          std::string         memo );
  };

  EOSIO_ACTIONS(
      reward,
      "edenproxyrwd"_n,
      action( init ),
      action( signup, owner, recipient ),
      action( resign, owner ),
      action( changercpt, owner, recipient, admin ),
      action( distribute, max_steps ),
      action( claim, owner ),
      action( receipt, owner, reward, staked, unclaimed, distribution_time ),
      notify( SUPPORTED_TOKEN_CONTRACT, transfer ) )
} // namespace edenproxy