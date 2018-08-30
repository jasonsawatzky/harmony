
const bcrypt = require('bcryptjs') //TODO Switch back to bcrypt
import { hash } from 'bcryptjs'

let model

export default function(conn) {
	const answerSchema = conn.Schema({
		text: {
			type: String,
			required: true
		},
		rating: {
			type: Number,
		}
	})

	const schema = conn.Schema({
		text: {
			type: String,
			required: true
		},
		required: {
			type: Boolean,
			required: true
		},
		answers: [answerSchema]
	})

	if (!model) {
		model = conn.model('Question', schema)
	}

	return model
}
