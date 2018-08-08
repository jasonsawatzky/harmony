const { makeExecutableSchema } = require('graphql-tools')

const userSchema = `
	firstName: String
	lastName: String
	username: String
	email: String
	birthdate: String
	password: String
	confirmPassword: String
`

module.exports = makeExecutableSchema({ typeDefs: `
	type Query {
		user(email: String!): User
		currentUser : User
		users(${userSchema}): [User]
		session(username: String!, password: String!): String
	}
	type User {
		${userSchema}
	}
	type Mutation {
		createUser(user: UserInput): String
	}
	input UserInput {
		${userSchema}
	}
`})
