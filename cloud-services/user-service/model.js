const bcrypt = require('bcryptjs') //TODO Switch back to bcrypt
import { hash } from 'bcryptjs'
import mongoose from 'mongoose'

let model

export default function(conn) {
	const answerRatingSchema = conn.Schema({
		answer: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			index: true
		},
		rating: {
			type: Number
		}
	})
	const comparisonPointSchema = conn.Schema({
		question: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			index: true
		},
		choice: {
			type: mongoose.Schema.Types.ObjectId,
			index: true
		},
		answerRatings: [answerRatingSchema]
	})

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
		},
		instagramLink: {
			type: String,
			required: false
		},
		details: {
			type: Map,
			of: String,
			required: false
		},
		comparisonPoints: [comparisonPointSchema],
		activeGroup: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Group',
			index: true
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
