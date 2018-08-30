import { User, UserGroupmateView } from 'user-service'
import GroupService from 'group-service'

export default {
	Query: {
		currentUser: (_, __, context) => User.init({ conn: context.conn, id: context.auth.id }),
		session: (_, creds) => User.getSession(creds),
	},
	Mutation: {
		createUser: (_, { user }, context) => User.create(context.conn, user),
	},
	User: {
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
	},
	Group: {
		id: (group) => group.id(),
		description: (group) => group.description(),
		creator: (group) => group.creator(),
		members: (group) => group.members(),
		addMembers: (group, { groupId, memberIds }) => group.addMembers(memberIds)
	},
}
