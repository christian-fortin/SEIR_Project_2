const mongoose = require('./connection')
// This is brings in the connection we made to mongoDB.


const CodeChallenge = require('../models/codeChallenge')
// THis brings in the schema created


const userSeeds = require('../db/seeds.json')
// This brings in the JSON data. 


CodeChallenge.deleteMany({})
.then(()=> {
    return CodeChallenge.insertMany(userSeeds)
})
.then(data => console.log(data))
.catch(err => console.log(err))
.finally(()=> {
    process.exit()
})
// **********What does this do???
// It is something with 


