import express from 'express'
import cors from 'cors'
import awsServerlessExpress from 'aws-serverless-express'
import { client as clientConfig } from 'deployment-config'
import { authExpress } from './auth'
import { graphqlApiExpress, graphiql } from 'graphql-api'
import conn from './connection'
import bodyParser from 'body-parser'

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

app.use(function(req, res, next) {
  req.conn = conn
  next()
})

app.use(bodyParser.json())

graphqlApiExpress.applyMiddleware({ app })

// Start server
const server = awsServerlessExpress.createServer(app)
exports.serverlessHook = (event, context) => awsServerlessExpress.proxy(server, event, context)
