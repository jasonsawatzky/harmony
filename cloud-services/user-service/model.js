import mongoose from './connection'
const bcrypt = require('bcryptjs') //TODO Switch back to bcrypt
import { hash } from 'bcryptjs'

const schema = mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
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

export default mongoose.model('User', schema)
