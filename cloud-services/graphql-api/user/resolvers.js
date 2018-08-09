import UserService from 'user-service'

export default {
	Query: {
		user: (_, { id }, context) => UserService(context.conn).get(id),
		users: (_, args, context) => UserService(context.conn).getAll(),
		currentUser: (_, args, context) => UserService(context.conn).getCurrent(context),
		session: (_, creds, context) => UserService(context.conn).getSession(creds)
	},
	Mutation: {
		createUser: (_, { user }) => userService.create(user)
	}
}
