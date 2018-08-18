import UserService from 'user-service'
import GroupService from 'group-service'

export default {
	Query: {
		currentUser: (_, args, context) => UserService(context.conn).getCurrent(context),
		session: (_, creds, context) => UserService(context.conn).getSession(creds),
		group: (_, { id }, context) => GroupService(context.conn).get(context, id)
	},
	Mutation: {
		createUser: (_, { user }, context) => UserService(context.conn).create(user),
	},
	User: {
		groups: (user, __, context) => GroupService(context.conn).getUserGroups(context, user.id),
		createGroup: (user, { description }, context) => GroupService(context.conn).create(context, user.id, description),
		setInstagramLink: (user, { value }, context) => UserService(context.conn).setDetail(context, user.id, "instagramLink", value),
		details: (user, _, context) => UserService(context.conn).getDetails(context, user)
	},
	Group: {
		creator: (group, _, context) => UserService(context.conn).get(context, group.creator),
		members: (group, _, context) => GroupService(context.conn).getMembers(context, group),
		addMembers: (group, { groupId, memberIds }, context) => GroupService(context.conn).addMembers(context, group, memberIds)
	},
}
