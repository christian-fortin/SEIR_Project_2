const mongoose = require('../db/connection')
// Connecting the mongodb data base with this schema. 


const CodeChallengeSchema = new mongoose.Schema ({
    title : String,
    zipFile: String,
    description: String,
    videoFile: String
})
// Schema for the object that is going to be displayed and what goes into the database. 


const CodeChallenge = mongoose.model('CodeChallenge', CodeChallengeSchema)
module.exports = CodeChallenge;
// Puts the model into a varriable to be exported