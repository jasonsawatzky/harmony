const bcrypt = require('bcryptjs') //TODO Switch back to bcrypt
import { hash } from 'bcryptjs'

let model

export default function(conn) {
	const schema = conn.Schema({
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

	if (!model) {
		model = conn.model('User', schema)
	}

	return model
}
