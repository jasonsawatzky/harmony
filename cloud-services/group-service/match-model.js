import { hash } from 'bcryptjs'
import mongoose from 'mongoose'

let model
export default function(conn) {
	const schema = conn.Schema({
		groups: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Group',
      index: true
		}],
    messages: [{
			type: String,
		}]
	})

	if (!model) {
		model = conn.model('Match', schema)
	}

	return model
}
