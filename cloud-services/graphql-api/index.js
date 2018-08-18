import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { mergeSchemas } from 'graphql-tools'
import schema from './schema'
import resolvers from './resolvers'
import bodyParser from 'body-parser'
import connect from 'connect'

/*
** Express middleware for GraphQL
*/
export const graphqlApiExpress = connect()

graphqlApiExpress.use(bodyParser.json())

graphqlApiExpress.use(graphqlExpress(req => {
  return {
    schema: mergeSchemas({
      schemas: [schema],
      resolvers: resolvers
    }),
    context: {
      auth: req.auth,
      conn: req.conn
    }
  }
}))

export const graphiql = graphiqlExpress
