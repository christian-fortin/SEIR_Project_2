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
router.get("/register", (req, res) => {
  res.render("sessions/register.ejs");
});

// Sending data for registering
router.post("/register", async (req, res, next) => {
  try {
    // Validation of password
    if (req.body.password === req.body.verifyPassword) {
      const desiredUsername = req.body.username;
      // Finds the user
      const userExists = await User.findOne({ username: desiredUsername });
      // If it exists then the username is already taken error
      if (userExists) {
        res.send("Username already taken");
      } else {
        // Generates a hashed password using bcrypt, as well as logging in the new user
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashedPassword;
        const createdUser = await User.create(req.body);
        req.session.username = createdUser.username;
        req.session.loggedIn = true;
        res.redirect("/");
        req.session.message = "Invalid Username or Password"
      }
    } else {
      // Checking for password match
      res.send("Password must match");
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
      const validPassword = bcrypt.compareSync(
        req.body.password,
        userToLogin.password
      );

      if (validPassword) {
        req.session.username = userToLogin.username;
        req.session.loggedIn = true;
        res.redirect("/");
      } else {
        res.redirect("/sessions/login");
      }
    } else {
      res.redirect("/sessions/login");
    }
  } catch (err) {
    next(err);
  }
});


// Logging a user out.
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/sessions/login");
});

module.exports = router;
