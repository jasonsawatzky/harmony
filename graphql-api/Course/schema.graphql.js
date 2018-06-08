const { makeExecutableSchema } = require('graphql-tools')

const courseSchema = `
	id: Int
	title: String
	author: String
	description: String
	topic: String
	url: String
`

module.exports = makeExecutableSchema({ typeDefs: `
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
`})