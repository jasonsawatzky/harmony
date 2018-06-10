const { makeExecutableSchema } = require('graphql-tools')

const userSchema = `
	name: String
	username: String
	email: String
	birthdate: String
	password: String
	confirmPass: String
`

module.exports = makeExecutableSchema({ typeDefs: `
	type Query {
		user(id: String!): User
		users(${userSchema}): [User]
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