require('dotenv').config()
// Connects to the .env
const mongoose = require('mongoose')
// using mongoose

const MONGODB_URI = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost:27017/meal'
// Telling if it is enviromental in production or use the local database of mongodb

mongoose.connect( MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
// Connects to the mongodb database

.then(instance => {
    console.log(`Connected to the db: ${instance.connections[0].name}`);
})
.catch(err=> console.log(`Connection failed`, err))

module.exports = mongoose