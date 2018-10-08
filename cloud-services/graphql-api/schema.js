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
		currentUser: User
		session(username: String!, password: String!): String
	}
	type User {
		${userInputSchema}
		groups: [Group]
		group(id: ID): Group
		createGroup(description: String): String
		details: UserDetails
		setInstagramLink(value: String): String
		question(id: ID): Question
		questions: [Question]
		createQuestion(text: String, required: Boolean, answers: [String]): Question
		answerQuestion(id: ID, choice: ID): String
		rateAnswer(question: ID, answer: ID, rating: Int): String
		suggestion: Group
	}
	type UserDetails {
		instagramLink: String
	}
	type Requirements {
		gender: String,
		maxAge: Int,
		minAge: Int
	}
	type Group {
		id: ID
		creator: User
		members: [User]
		description: String
		addMembers(groupId: String, memberIds: [String]): String
	}

	type Answer {
		id: ID,
		text: String,
		rating: Int
	}

	type Question {
		id: ID,
		text: String,
		required: Boolean,
		answers: [Answer]
	}

	type Mutation {
		createUser(user: UserInput): String
	}
	input UserInput {
		${userInputSchema}
	}
`})
