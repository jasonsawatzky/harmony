const express = require('express')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')

const { schema } = require('./Course')

const app = express()

app.set('port', process.env.PORT || 3000)

// configure development environment
if (app.get('env') === 'development') {
    app.set('graphiql', true)
}

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// Start server
app.listen(app.get('port'), () => console.log(`GraphQL server up on port ${app.get('port')}.`))