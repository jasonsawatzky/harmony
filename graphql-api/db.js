const mongoose = require('mongoose')

const courseData = [
	{
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]

mongoose.connect('mongodb://localhost/Harmony')
	.then(() => console.log('Connected to database.'))
	.catch(err => console.error('Error connecting to database.'))

const Course = mongoose.model('course', mongoose.Schema({
	id: Number,
	title: String,
	author: String,
	description: String,
	topic: String,
	url: String
}))

courseData.forEach(course => new Course(course).save()
	.then(() => console.log('User saved.'))
	.catch(err => console.error('Error saving user.'))
)