#include <myvoteeosdao/myvoteeosdao.hpp>

void dao::myvoteeosdao::addproxy( name proxy ) {
  check( is_proxy( proxy ), "Only registered proxies can be included" );
  require_auth( _self );

  // Init the proxies table
  proxy_table _proxy( get_self(), get_self().value );

  // Find the record from _proxy table
  auto proxy_itr = _proxy.find( proxy.value );
  if ( proxy_itr == _proxy.end() ) {
    // Create a proxy record if it does not exist
    _proxy.emplace( _self, [&]( auto &row ) { row.proxy = proxy; } );
  }
}

void dao::myvoteeosdao::rmproxy( name proxy ) {
  require_auth( _self );

  // Init the proxies table
  proxy_table _proxy( get_self(), get_self().value );

  // Find the record from _proxy table
  auto proxy_itr = _proxy.find( proxy.value );
  if ( proxy_itr == _proxy.end() ) {
    printf( "Proxy does not exist in table, nothing to delete" );
    return;
  }
  // Delete a proxy record if it exists in the table
  _proxy.erase( proxy_itr );
}

void dao::myvoteeosdao::addproducer( name producer ) {
  // check( is_active_bp( producer ),
  //        "Only registered block producers can be included" );
  require_auth( _self );

  // Init the producer table
  producer_table _producer( get_self(), get_self().value );

  // Find the record from _producer table
  auto producer_itr = _producer.find( producer.value );
  if ( producer_itr == _producer.end() ) {
    // Create a producer record if it does not exist
    _producer.emplace( _self, [&]( auto &row ) { row.producer = producer; } );
  }
}

void dao::myvoteeosdao::rmproducer( name producer ) {
  require_auth( _self );

  // Init the producer table
  producer_table _producer( get_self(), get_self().value );

  // Find the record from _producer table
  auto producer_itr = _producer.find( producer.value );
  if ( producer_itr == _producer.end() ) {
    printf( "Producer does not exist in table, nothing to delete" );
    return;
  }
  _producer.erase( producer_itr );
}

void dao::myvoteeosdao::clear() {
  require_auth( get_self() );

  proxy_table _proxy( get_self(), get_self().value );

  // Delete all records in _proxy table
  auto proxy_itr = _proxy.begin();
  while ( proxy_itr != _proxy.end() ) {
    proxy_itr = _proxy.erase( proxy_itr );
  }

  producer_table _producer( get_self(), get_self().value );

  // Delete all records in _producer table
  auto producer_itr = _producer.begin();
  while ( producer_itr != _producer.end() ) {
    producer_itr = _producer.erase( producer_itr );
  }
}

EOSIO_ACTION_DISPATCHER( dao::actions )

EOSIO_ABIGEN( actions( dao::actions ),
              table( "proxy"_n, dao::proxy ),
              table( "producer"_n, dao::producer ) )