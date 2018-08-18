import mongoose from 'mongoose'
import { mongo } from '../../deployment-config'

const url = 'mongodb://' + mongo.userName +
	':' + mongo.password + '@' + mongo.domain +
	':' + mongo.port + '/' + mongo.dbName

mongoose.connect(url)
	.then(() => console.log('Connected to database.'))
	.catch(err => console.error('Error connecting to database: ', err))

export default mongoose
