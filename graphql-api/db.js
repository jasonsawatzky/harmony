const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/Harmony')
	.then(() => console.log('Connected to database.'))
	.catch(err => console.error('Error connecting to database.'))

const User = mongoose.model('User', mongoose.Schema({
	name: {
		firstName: String,
		lastName: String
	},
	created: Date
}))

new User({
	name: {
		firstName: 'Derek',
		lastName: 'Lance'
	},
	created: Date.now()
}).save()
	.then(() => console.log('User saved.'))
	.catch(err => console.error('Error saving user.'))