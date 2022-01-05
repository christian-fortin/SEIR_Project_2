const mongoose = require('../db/connection')

const UserSchema = new mongoose.Schema ({
    email: String,
    name: String
})

const Bookmark = mongoose.model('User', UserSchema)

module.exports = User;