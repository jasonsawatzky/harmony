const mongoose = require('mongoose')
import conf from "../deployment-config.js"
const mongo = conf.mongo

const url = 'mongodb://' + mongo.userName +
	':' + mongo.password + '@' + mongo.domain +
	':' + mongo.port + '/' + mongo.dbName

console.log(url)

mongoose.connect(url)
	.then(() => console.log('Connected to database.'))
	.catch(err => console.error('Error connecting to database: ', err))

module.exports = mongoose
