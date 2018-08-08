import express from 'express'
import cors from 'cors'
import awsServerlessExpress from 'aws-serverless-express'
import { client as clientConfig } from 'deployment-config'
import { authExpress } from './auth'
import { graphqlApiExpress, graphiql } from 'graphql-api'


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

app.use('/graphql', graphqlApiExpress)

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiql({ endpointURL: '/graphql' }))

// Start server
const server = awsServerlessExpress.createServer(app)
exports.serverlessHook = (event, context) => awsServerlessExpress.proxy(server, event, context)
