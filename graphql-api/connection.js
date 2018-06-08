const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/Harmony')
	.then(() => console.log('Connected to database.'))
	.catch(err => console.error('Error connecting to database.'))

module.exports = mongoose