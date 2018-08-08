const mongoose = require('mongoose')
const config = require('../../deployment-config')

// import mongoose from 'mongoose'
// import {config} from '../../deployment-config'

const mongo = config.mongo

const url = 'mongodb://' + mongo.userName +
	':' + mongo.password + '@' + mongo.domain +
	':' + mongo.port + '/' + mongo.dbName

mongoose.connect(url)
	.then(() => console.log('Connected to database.'))
	.catch(err => console.error('Error connecting to database: ', err))

module.exports = mongoose
