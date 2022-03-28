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
// const PORT = 6000
app.set('port', process.env.PORT || 3000)
// const PORT = process.env.PORT
const SESSION_SECRET = process.env.SESSION_SECRET
const methodOverride = require('method-override')
const expressEjsLayout = require('express-ejs-layouts')
const mealController = require('./controllers/meal')
const sessionController = require('./controllers/sessions')
const session = require('express-session')
app.use(expressEjsLayout)
app.set('view engine', 'ejs')

// const exphbs = require("express-handlebars");
// app.engine("handlebars", exphbs.engine());
// app.set("view engine", "handlebars");


app.use(express.static('public/'))
app.use(methodOverride('_method'));




// const multer = require("multer");

// let Storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "./public/images");
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//   },
// });

// let upload = multer({
//   storage: Storage,
// }).single("image"); //Field name and max count


const routeHit = (req,res,next) =>{
    console.log("A new route was just hit");
    next()
}
app.use(routeHit)
// Just tells us when we change between routes for development purposes
app.use(express.urlencoded({extended:false}));


// Session middleware
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

app.use((req, res, next) => {
    res.locals.username = req.session.username
    res.locals.loggedIn = req.session.loggedIn
    next()
})

// const authRequired = (req, res, next) => {
//     if (req.session.loggedIn) {
//         // if the user is logged in, resolve the route
//         next()
//     } else {
//         // otherwise redirect them to the log in page
//         res.redirect('/session/login')
//     }
// }




// setting up controller
app.use('/', mealController)
app.use('/sessions', sessionController)

// app.get('/setCookie/:data', (req, res) => {
//     req.session.data= req.params.data
//     res.send('session data set')
// })


// app.get('/getSessionInfo', (req, res) => {
//     res.send(req.session.data)
// })

// Listening port and initiating server
app.listen(app.get('port'), ()=> console.log(`Port: ${app.get('port')}`))
