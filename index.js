// SET UP
//////////////////////////////////////////////////////////////////
// PACKAGES/SETUPS TO INSTALL BEFOREHAND
// npm init -y
// npm install nodemon
// npm install express
// npm install mongoose
// npm install dotenv
//////////////////////////////////////////////////////////////////
require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 6009
// const PORT = process.env.PORT
const methodOverride = require('method-override')
// const expressEjsLayout = require('express-ejs-layouts')
const chunksController = require('./controllers/chunks')



app.use(express.static('public'))
app.use(methodOverride('_method'));

const routeHit = (req,res,next) =>{
    console.log("A new route was just hit");
    next()
}
app.use(routeHit)

app.use(express.urlencoded({extended:false}));

// app.use(expressEjsLayout)
app.set('view engine', 'ejs')



// setting up controller
app.use('/', chunksController)


app.listen(PORT, ()=> console.log(`Port: ${PORT}`))
