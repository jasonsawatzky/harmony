const User = require('./schema.mongo')

module.exports = {
	Query: {
		user: (_, { email }) => User.findOne({ email }),
		users: (_, args) => User.find(args)
	},
	Mutation: {
		createUser: async (_, { user }) => (await User.create(user))._id
	}
}