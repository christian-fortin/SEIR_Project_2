// SET UP -- Static
///////////////////////////////////////////////////////////////////////////////
const express = require('express')
// This^ brings in the package "express" to my code which is back end web application framework for Node.js. It helps get access to things like .set .use .get .delete .put .post

const router = express.Router()
// The express.Router() function is used to create a new router object. This function is used when you want to create a new router object in your program to handle requests. This can handle multiple routes. 

const CodeChallenge = require('../models/codeChallenge')
// This pulls in the model schema for when we are creating a new value/object. 
///////////////////////////////////////////////////////////////////////////////




// ROUTES
///////////////////////////////////////////////////////////////////////////////
//INDEX
router.get("/", (req, res, next) => {
    data = CodeChallenge.find({})
    .then(codeChallenges => res.json(codeChallenges))
    .catch(next)
    res.json(data)
})
///////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////
module.exports = router

// ***** Why are we exporting this?
///////////////////////////////////////////////////////////////////////////////