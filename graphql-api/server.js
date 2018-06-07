const express = require('express')
const expressGraphql = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')

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
    input CourseInput {
        id: Int
		title: String
        author: String
        description: String
        topic: String
        url: String
    }
    type Mutation {
        createCourse(course: CourseInput): Course
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

mongoose.connect('mongodb://localhost/Harmony')
	.then(() => console.log('Connected to database.'))
	.catch(err => console.error('Error connecting to database.'))

const Course = mongoose.model('course', mongoose.Schema({
	id: Number,
	title: String,
	author: String,
	description: String,
	topic: String,
	url: String
}))

// const courses = Course
//     .find({ topic: 'Node.js', author: 'Brad Traversy' })
//     .exec((err, result) => !err && console.log(result))

const rootValue = {
    course: args => Course.findOne({ id: args.id }),
    courses: args => Course.find(args),
    createCourse: args => Course.create(args.course)
}

const app = express()
app.use('/graphql', expressGraphql({
	schema,
	rootValue,
	graphiql: true
}))
app.listen(3000, () => console.log('GraphQL server up on port 3000'))