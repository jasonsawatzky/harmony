const Course = require('./schema.mongo')

module.exports = {
	Query: {
		course: (_, { id }) => Course.findById(id),
		courses: (_, args) => Course.find(args)
	},
	Mutation: {
		createCourse: (_, args) => Course.create(args.course)
	}
}