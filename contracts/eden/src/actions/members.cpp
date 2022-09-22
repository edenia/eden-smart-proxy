#include <eden/eden.hpp>
#include <eden/members.hpp>

namespace eden {
  void eden::createmember( eosio::name account ) {
    members members( get_self() );

    members.create( account );
  }

  void eden::actmember( eosio::name account, const std::string &name ) {
    members members( get_self() );

    members.setactive( account, name );
  }

  void eden::inacmember( eosio::name account ) {
    members members( get_self() );

    members.setinactive( account );
  }

  void eden::setmembrank( eosio::name account,
                          uint8_t     rank,
                          eosio::name representative ) {
    members members( get_self() );

    members.setrank( account, rank, representative );
  }

  void eden::setglobstats( std::vector< uint16_t > ranks ) {
    members members( get_self() );

    members.setstats( ranks );
  }
} // namespace eden