#pragma once

#include <eden/members.hpp>
#include <eosio/eosio.hpp>

namespace eden {
  class eden : public eosio::contract {

  public:
    using contract::contract;

    eden( eosio::name                       receiver,
          eosio::name                       code,
          eosio::datastream< const char * > ds )
        : contract( receiver, code, ds ) {}

    void createmember( eosio::name account );
    void actmember( eosio::name account, const std::string &name );
    void inacmember( eosio::name account );
    void setmembrank( eosio::name account,
                      uint8_t     rank,
                      eosio::name representative );
    void setglobstats( std::vector< uint16_t > ranks );
  };

  EOSIO_ACTIONS( eden,
                 "genesis.eden"_n,
                 action( createmember, account ),
                 action( actmember, account, name ),
                 action( inacmember, account ),
                 action( setmembrank, account, rank, representative ),
                 action( setglobstats, ranks ) )

} // namespace eden