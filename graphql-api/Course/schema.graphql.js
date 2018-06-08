const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const courseSchema = `
	id: Int
	title: String
	author: String
	description: String
	topic: String
	url: String
`

const typeDefs = `
	type Query {
		course(id: Int!): Course
		courses(
			title: String
			topic: String
			url: String
			author: String
			description: String): [Course]
	}
	type Mutation {
		createCourse(course: CourseInput): Course
	}
	input CourseInput {
		${courseSchema}
	}
	type Course {
		${courseSchema}
	}
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })