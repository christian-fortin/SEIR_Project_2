const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { append } = require("express/lib/response");
const router = express.Router();
// Importing the neccesary libraries

// Just a check route
// router.get("/", (req, res) => {
//   res.send("Session Controller works");
// });

//Show page for registering
router.get('/register', (req, res) => {
  res.render('sessions/register.ejs');
});

// Sending data for registering
router.post('/register', async (req, res, next) => {
  try {
    // Validation of password
    if (req.body.password === req.body.verifyPassword) {
      // passwords must match
      const desiredUsername = req.body.username
      // Finds the user
      const userExists = await User.findOne({ username: desiredUsername })
      // If it exists then the username is already taken error
      if (userExists) {
        req.session.message = 'User name already taken'
      } else {
        // we're going to encrypt our passwords with bcrypt
        // that way we, or any hacker, can't access their passwords
        const salt = bcrypt.genSaltSync(10)
        // salt is extra "garbage" that gets thrown into encrypted passwords
        // the more salt, the more secure
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)
        // our first argument is the string we want to encrypt
        // in our case the password
        // second argument is the salt
        req.body.password = hashedPassword;
         // reassigning our password to the hashed version
        const createdUser = await User.create(req.body)
        req.session.username = createdUser.username
        req.session.loggedIn = true
        res.redirect("/");
      }
    } else {
      // Checking for password match
      req.session.message = 'Passwords must match'
      res.redirect('/session/register')
    }
  } catch (err) {
    next(err);
  }
});

// Show page for login 
router.get("/login", (req, res) => {
  res.render("sessions/login.ejs");
});

// Sends data for login page, checks username and passwords
router.post("/login", async (req, res, next) => {
  try {
    const userToLogin = await User.findOne({ username: req.body.username });
    if (userToLogin) {
      // we need to check if the passwords match
      // we do this with bcrypt.compareSync
      const validPassword = bcrypt.compareSync(
        req.body.password,
        userToLogin.password
      )
      // compareSync compares the first cleartext argument to the encrypted second argument
      // returns a boolean, true if they match, false if they don't

      if (validPassword) {
        req.session.username = userToLogin.username;
        req.session.loggedIn = true;
        res.redirect("/");
      } else {
        res.redirect("/sessions/login");
        req.session.message = "Invalid username or password"
                // we're setting a session message here
                // this is a nice way to communicate with our users
      }
    } else {
      req.session.message = 'Invalid username or password'
      res.redirect("/sessions/login");
    }
  } catch (err) {
    next(err);
  }
});


// Logging a user out.
router.get("/logout", (req, res) => {
     // to log out we need to DESTROY our session
    // we simply call the destroy() method on our session object
  req.session.destroy();
  res.redirect("/sessions/login");
});

module.exports = router;
