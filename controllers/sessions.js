const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { append } = require("express/lib/response");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Session Controller works");
});

router.get("/register", (req, res) => {
  res.render("sessions/register.ejs");
});

router.post("/register", async (req, res, next) => {
  try {
    if (req.body.password === req.body.verifyPassword) {
      const desiredUsername = req.body.username;
      const userExists = await User.findOne({ username: desiredUsername });
      if (userExists) {
        res.send("Username already taken");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashedPassword;
        const createdUser = await User.create(req.body);
        req.session.username = createdUser.username;
        req.session.loggedIn = true;
        res.redirect("/chunks");
        req.session.message = "Invalid Username or Password"
      }
    } else {
      res.send("Password must match");
    }
  } catch (err) {
    next(err);
  }
});

router.get("/login", (req, res) => {
  res.render("sessions/login.ejs");
});

router.post("/login", async (req, res, next) => {
  try {
    const userToLogin = await User.findOne({ username: req.body.username });
    if (userToLogin) {
      const validPassword = bcrypt.compareSync(
        req.body.password,
        userToLogin.password
      );

      res.redirect("/chunks");
      if (validPassword) {
        req.session.username = userToLogin.username;
        req.session.loggedIn = true;
        res.redirect("/chunks");
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

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/sessions/login");
});

module.exports = router;
