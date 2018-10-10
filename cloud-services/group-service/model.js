 const bcrypt = require('bcryptjs') //TODO Switch back to bcrypt
import { hash } from 'bcryptjs'
import mongoose from 'mongoose'

let model
export default function(conn) {
  const suggestedSchema = conn.Schema({
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true
    },
    status: {
      type: String
    },
    matched: {
      type: Boolean,
    }
  })

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
		},
    suggested: [suggestedSchema]
	})

	if (!model) {
		model = conn.model('Group', schema)
	}

	return model
}
