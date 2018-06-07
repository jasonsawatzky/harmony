const express = require('express')
const expressGraphql = require('express-graphql')
const { buildSchema } = require('graphql')

const schema = buildSchema(`
	type Query {
		course(id: Int!): Course
        courses(
            title: String,
            topic: String,
            url: String,
            author: String,
            description: String): [Course]
	},
	type Course {
		id: Int
		title: String
        author: String
        description: String
        topic: String
        url: String
	}
`)

const courseData = [
	{
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]

const rootValue = {
    course: args => courseData.find(course => course.id === args.id),
    courses: args => courseData.filter(course =>
        Object.keys(args).every(key =>
            course[key] === args[key]
        )
    )
}

const app = express()
app.use('/graphql', expressGraphql({
	schema,
	rootValue,
	graphiql: true
}))
app.listen(3000, () => console.log('GraphQL server up on port 3000'))