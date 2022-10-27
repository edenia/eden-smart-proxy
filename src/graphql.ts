import { ApolloClient, InMemoryCache } from '@apollo/client'

import { graphqlConfig } from './config'

export const client = new ApolloClient({
  uri: graphqlConfig,
  cache: new InMemoryCache()
})
