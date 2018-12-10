import { ApolloServer, gql } from 'apollo-server-express'
import { mergeSchemas } from 'graphql-tools'
import schema from './schema'
import resolvers from './resolvers'

/*
** Express middleware for GraphQL
*/
export const graphqlApiExpress = new ApolloServer(
  {
    typeDefs: gql(schema),
    resolvers,
    context: async ({ req }) => {
      return {
        auth: req.auth,
        conn: req.conn
      }
    }
  }
)
