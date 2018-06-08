const mongoose = require('../connection')

module.exports = mongoose.model('Course', mongoose.Schema({
    id: Number,
    title: String,
    author: String,
    description: String,
    topic: String,
    url: String
}))