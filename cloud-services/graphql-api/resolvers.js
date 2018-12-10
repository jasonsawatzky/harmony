import { User, UserGroupmateView } from 'user-service'
import GroupService from 'group-service'
import { Question } from 'question'

export default {
	Query: {
		createUser: (_, { user }, context) => User.create(context.conn, user),
		currentUser: (_, creds, context) =>
			(context.auth.id  && User.init({ conn: context.conn, id: context.auth.id, type: 'CurrentUser' })) ||
		  (creds && User.initAuth(context.conn, creds)) ||
			Error(context.auth.status),
		auth: (_, creds) => User.auth(creds),
		question: (_, { id }, context) => Question.init({ conn: context.conn, id }),
		questions: (_, __, context) => Question.getAll(context.conn),
	},
	CurrentUser: {
		__resolveType: (obj) => obj.gqlType(),
		id: (user) => user.id(),
		firstName: (user) => user.firstName(),
		lastName: (user) => user.lastName(),
		username: (user) => user.username(),
		email: (user) => user.email(),
		birthdate: (user) => user.birthdate(),
		groups: (user) => user.groups(),
		group: (user, { id }) => user.group(id),
		createGroup: (user, { description }) => user.startGroup(description),
		setInstagramLink: (user, { value }) => user.setDetail('instagramLink', value),
		details: (user) => user.details(),
		createQuestion: (_, { text, required, answers }, context) => Question.create(context.conn, text, required, answers),
		answerQuestion: (user, { id, choice }) => user.answerQuestion(id, choice),
		rateAnswer: (user, { question, answer, rating }) => user.rateAnswer(question, answer, rating),
		activeGroup: (user) => user.activeGroup(),
		setActiveGroup: (user, { id }) => user.setActiveGroup(id)
	},
	GroupMate: {
		__resolveType: (obj) => obj.gqlType(),
		id: (user) => user.id(),
		firstName: (user) => user.firstName(),
		lastName: (user) => user.lastName(),
		details: (user) => user.details()
	},
	GroupMember: {
		__resolveType: (obj) => obj.gqlType(),
		id: (user) => user.id(),
		firstName: (user) => user.firstName(),
		lastName: (user) => user.lastName(),
		details: (user) => user.details()
	},
	MatchedUser: {
		__resolveType: (obj) => obj.gqlType(),
		id: (user) => user.id(),
		firstName: (user) => user.firstName(),
		lastName: (user) => user.lastName(),
		details: (user) => user.details()
	},
	SuggestedUser: {
		__resolveType: (obj) => obj.gqlType(),
		id: (user) => user.id(),
		firstName: (user) => user.firstName(),
	},
	UserGroup: {
		id: (group) => group.id(),
		creator: (group) => group.creator(),
		members: (group) => group.members(),
		description: (group) => group.description(),
		addMembers: (group, { members }) => group.addMembers(members)
	},
	ActiveGroup: {
		id: (group) => group.id(),
		creator: (group) => group.creator(),
		members: (group) => group.members(),
		description: (group) => group.description(),
		addMembers: (group, { members }) => group.addMembers(memberIds),
		suggestion: (group) => group.suggestion(),
		suggested: (group, { id }) => group.suggested(id),
		matches: (group) => group.matches()
	},
	SuggestedGroup: {
		id: (group) => group.id(),
		members: (group) => group.members(),
		description: (group) => group.description(),
		like: (group) => group.like(),
		dislike: (group) => group.dislike(),
	},
	MatchedGroup: {
		id: (group) => group.id(),
		members: (group) => group.members(),
		description: (group) => group.description(),
	},
	Question: {
		id: (question) => question.id(),
		text: (question) => question.text(),
		required: (question) => question.required(),
		answers: (question) => question.answers(),
	},
	Answer: {
		id: (answer) => answer.id,
		text: (answer) => answer.text,
		rating: (answer) => answer.rating
	}
}
