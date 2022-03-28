const mongoose = require('../db/connection')
// Schema for user creation
const userSchema = new mongoose.Schema({
    username: 
    {type: String,
    unique: true, 
    required: true},
    
    password:
    {type: String,
    required: true},
})

const User = mongoose.model('User', userSchema)

module.exports = User
