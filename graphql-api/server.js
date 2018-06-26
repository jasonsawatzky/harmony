const { mergeSchemas } = require('graphql-tools')
const express = require('express')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')
const cors = require('cors')
const awsServerlessExpress = require('aws-serverless-express')

// TODO: extract logic to merge schemas into separate file
const { schema: userSchema, resolvers: userResolvers } = require('./User')

const schema = mergeSchemas({
    schemas: [userSchema],
    resolvers: {
        Query: {
            ...userResolvers.Query
        },
        Mutation: {
            ...userResolvers.Mutation
        }
    }
})

const app = express()

app.set('port', process.env.PORT || 3000)

// configure development environment
if (app.get('env') === 'development') {
    app.set('graphiql', true)
}

// Enable CORS
app.use(cors())

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// Start server
// app.listen(app.get('port'), () => console.log(`GraphQL server up on port ${app.get('port')}.`))
const server = awsServerlessExpress.createServer(app)
exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context)
