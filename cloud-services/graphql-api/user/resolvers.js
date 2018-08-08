const userService = require('../../user-service')

module.exports = {
	Query: {
		user: (_, { id }, context) => userService.get(id),
		users: (_, args) => userService.getAll(),
		currentUser: (_, args, context) => userService.getCurrent(context),
		session: (_, creds) => userService.getSession(creds)
	},
	Mutation: {
		createUser: (_, { user }) => userService.create(user)
	}
}
