const mongoose = require('../connection')
const bcrypt = require('bcrypt')

const schema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	birthdate: {
		type: Date,
		required: true
	},
	password: {
		type: String,
		required: true
	}
})

schema.pre('save', async function () {
	this.password = await bcrypt.hash(this.password, 10)
})

module.exports = mongoose.model('User', schema)