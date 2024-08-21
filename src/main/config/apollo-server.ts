import resolvers from '../graphql/resolvers'
import typeDefs from '../graphql/type-defs'
import { statusCodePlugin } from '../graphql/plugins'
import { authDirectiveTransformer } from '@/main/graphql/directives'

import { makeExecutableSchema } from '@graphql-tools/schema'
import { ApolloServer } from 'apollo-server-express'
import type { Express } from 'express'

export default (app: Express): void => {
  let schema = makeExecutableSchema({ resolvers, typeDefs })
  schema = authDirectiveTransformer(schema)

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
    plugins: [statusCodePlugin]
  })
  server.start().then(() => {
    server.applyMiddleware({ app })
  }).catch((error) => {
    console.log(error)
  })
}
