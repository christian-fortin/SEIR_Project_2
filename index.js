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



app.use(express.static('public'))
app.use(methodOverride('_method'));



const routeHit = (req,res,next) =>{
    console.log("A new route was just hit");
    next()
}
app.use(routeHit)

app.use(express.urlencoded({extended:false}));

app.use(expressEjsLayout)
app.set('view engine', 'ejs')

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
app.listen(app.get('port'), ()=> console.log(`Port: ${app.get('port')}`))
