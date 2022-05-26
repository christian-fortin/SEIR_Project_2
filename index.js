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


app.use(express.static('public/'))
app.use(methodOverride('_method'));



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
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false, // default  more info: https://www.npmjs.com/package/express-session#resave
}))

app.use((req, res, next) => {
    res.locals.username = req.session.username
    res.locals.loggedIn = req.session.loggedIn
     // res.locals is the equivalent of the object that you pass to res.render
    // this means that in all views, req.session.username will be available
    // as the local variable username
    next()
})

app.use((req, res, next) => {
    res.locals.message = req.session.message
    // we're setting the session message as a local variable on all routes
    req.session.message = ""
    // after each request, we're going to reset the message to a blank string
    next()
})

// middleware to require authentication

// pass this is in to any controller or route that you don't want to have accessible
// to users who are not logged in
const authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        // if the user is logged in, resolve the route
        next()
    } else {
        // otherwise redirect them to the log in page
        // console.log('This was hit');
        res.redirect('/sessions/login')
        
    }
}




// setting up controller
app.use('/meal', /*authRequired,*/ mealController)
app.use('/sessions', sessionController)

app.get('/setCookie/:data', (req, res) => {
    req.session.data= req.params.data
    res.send('session data set')
})


app.get('/getSessionInfo', (req, res) => {
    res.send(req.session.data)
})


// Listening port and initiating server
app.listen(app.get('port'), ()=> console.log(`Port: ${app.get('port')}`))
