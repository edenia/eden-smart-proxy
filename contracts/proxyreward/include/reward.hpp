#pragma once

#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>

// #include <members.cpp>
// #include <myvoteeosdao/myvoteeosdao.hpp>

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
    void remove( eosio::name owner );
    void changercpt( eosio::name owner, eosio::name recipient );
    void updateall( uint32_t max_steps );
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
      action( remove, owner ),
      action( changercpt, owner, recipient ),
      action( claim, owner ),
      action( updateall, max_steps ),
      action( receipt, owner, reward, staked, unclaimed, distribution_time ),
      notify( default_funding_contract, transfer ) )

} // namespace edenproxy