// const User = require('./schema.mongo')
const userService = require('../../user-service')
console.log(userService)

// module.exports = {
// 	Query: {
// 		user: (_, { email }) => User.findOne({ email }),
// 		users: (_, args) => User.find(args)
// 	},
// 	Mutation: {
// 		createUser: async (_, { user }) => {
// 			console.log("User create", user)
// 			return (await User.create(user))._id
// 		}
// 	}
// }

module.exports = {
	Query: {
		user: (_, { id }) => userService.get(id),
		users: (_, args) => userService.getAll()
	},
	Mutation: {
		createUser: (_, { user }) => userService.create(user)
	}
}
