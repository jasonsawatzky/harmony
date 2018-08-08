const { mergeSchemas } = require('graphql-tools')
const express = require('express')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')
const cors = require('cors')
const awsServerlessExpress = require('aws-serverless-express')
import { client as clientConfig } from 'deployment-config'
import { authExpress } from './auth'

// TODO: extract logic to merge schemas into separate file
const { schema: userSchema, resolvers: userResolvers } = require('./user')

const schema = mergeSchemas({
    schemas: [userSchema],
    resolvers: {
        Query: {
            ...userResolvers.Query
        },
        Mutation: {
            ...userResolvers.Mutation
        }
    },
})

const app = express()

app.set('port', process.env.PORT || 3000)

// Configure development environment
if (app.get('env') === 'development') {
  app.set('graphiql', true)
}

app.use(cors({
  origin: clientConfig.clientUrl,
  credentials: true
}))

// Authenicate the request
app.use(authExpress)

app.use('/graphql', bodyParser.json(), graphqlExpress(req => {
  return {
    schema: schema,
    context: {
      auth: req.auth
    }
  }
}))

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// Start server
const server = awsServerlessExpress.createServer(app)
exports.serverlessHook = (event, context) => awsServerlessExpress.proxy(server, event, context)
