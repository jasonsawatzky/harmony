import { hash } from 'bcryptjs'
import mongoose from 'mongoose'

let model

export default function(conn) {
	const messageSchema = conn.Schema({
		text: {
			type: String,
			required: true,
		},
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			index: true
		}
	})

	const schema = conn.Schema({
		groups: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Group',
      index: true
		}],
    conversation: [messageSchema]
	})

	if (!model) {
		model = conn.model('Match', schema)
	}

	return model
}
