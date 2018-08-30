 const bcrypt = require('bcryptjs') //TODO Switch back to bcrypt
import { hash } from 'bcryptjs'
import mongoose from 'mongoose'

let model
console.log(mongoose.Schema.Types.ObjectId)
export default function(conn) {
	const schema = conn.Schema({
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true
		},
		members: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
      index: true
		}],
		description: {
			type: String,
			required: true
		}
	})

	if (!model) {
		model = conn.model('Group', schema)
	}

	return model
}
