import resolvers from '../graphql/resolvers'
import typeDefs from '../graphql/type-defs'

import { ApolloServer } from 'apollo-server-express'
import type { Express } from 'express'

export default (app: Express): void => {
  const server = new ApolloServer({
    resolvers,
    typeDefs
  })
  server.start().then(() => {
    server.applyMiddleware({ app })
  }).catch((error) => {
    console.log(error)
  })
}
