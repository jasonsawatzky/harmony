const User = require('./schema.mongo')

module.exports = {
	Query: {
		user: (_, { id }) => id.match(/^[0-9a-f]{24}$/i) && User.findById(id),
		users: (_, args) => User.find(args)
	},
	Mutation: {
		createUser: async (_, { user }) => User.create(user)
	}
}