import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import schema from './schema'
import bodyParser from 'body-parser'
import connect from 'connect'

/*
** Express middleware for GraphQL
*/
export const graphqlApiExpress = connect()

graphqlApiExpress.use(bodyParser.json())

graphqlApiExpress.use(graphqlExpress(req => {
  return {
    schema: schema,
    context: {
      auth: req.auth,
      conn: req.conn
    }
  }
}))

export const graphiql = graphiqlExpress
