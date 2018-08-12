import { makeExecutableSchema } from 'graphql-tools'

const userInputSchema = `
	id: ID
	firstName: String
	lastName: String
	username: String
	email: String
	birthdate: String
	password: String
	confirmPassword: String
`

export default makeExecutableSchema({ typeDefs: `
	type Query {
		currentUser : User
		session(username: String!, password: String!): String
		group(id: String): Group
	}
	type User {
		${userInputSchema}
		groups: [Group]
		createGroup(description: String): String
	}
	type Group {
		id: ID
		creator: User
		members: [User]
		description: String
		addMembers(groupId: String, memberIds: [String]): String
	}
	type Mutation {
		createUser(user: UserInput): String
	}
	input UserInput {
		${userInputSchema}
	}
`})
