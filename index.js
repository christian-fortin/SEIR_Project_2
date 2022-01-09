// SET UP
//////////////////////////////////////////////////////////////////
// PACKAGES/SETUPS TO INSTALL BEFOREHAND
// npm init -y
// npm install nodemon
// npm install express
// npm install mongoose
// npm install dotenv
//////////////////////////////////////////////////////////////////
const express = require('express')
// This^ brings in the package "express" to my code which is back end web application framework for Node.js. It helps get access to things like .set .use .get .delete .put .post

const app = express()
// This "activates" in our program and makes it use-able. 

require('dotenv').config()
// This brings in the ".env" file for ignored/hidden data for backend purposes. Right now it is for declaring the PORT we are using and to tell the computer we are in the "development" stage.

const mongoose = require('mongoose')
// This brings in mongoose for us to open a portal to MongoDB from express basically. Also helps with modeling our data.  


const codeChallengeController = require('./controllers/codeChallengeController')
//////////////////////////////////////////////////////////////////




// MIDDLEWARE
//////////////////////////////////////////////////////////////////
app.set('port', process.env.PORT || 8000)
// This "sets" the port we are listening on. It will look for a "PORT" in the .env file. If it doesnt find one it will automatically set it to 8000

app.use('/codeChallenges', codeChallengeController)
// This is letting the index page know that all of the controllers (CRUD basics and Other pages) will be coming from the controllers folder on this application and using the codeChallenges file. 
//////////////////////////////////////////////////////////////////






// LISTENING
//////////////////////////////////////////////////////////////////
app.listen(app.get('port'), ()=> {
    console.log(`PORT: ${app.get('port')}`);
})
// This is activating the port. It is listening on the port we designated in the .env file. This is a more complicated way of setting it up. 
//////////////////////////////////////////////////////////////////
