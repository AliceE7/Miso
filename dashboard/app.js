const express = require('express');
const app = express();
const passport = require("passport");
const Strategy = require('passport-discord').Strategy;

module.exports = async (client) => {
  //engine
  app.set('view engine', "ejs");
  app.set("views", __dirname + "views/");

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));
  passport.use(new Strategy({
    clientID: client.config.client.id,
    clientSecret: process.env.secret,
    callbackURL: client.config.dashboard.callback,
    scope: ["identify", "guilds"],
  },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(() => done(null, profile));
    },
  ));

  app.use(passport.initialize());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
  };

  app.get('/auth/login', passport.authenticate('discord'))

  app.get('/auth/callback', passport.authenticate('discord', {
    failureRedirect: "/"
  }), function(req, res) {
    res.redirect('/')
  })

  app.get("/", (req, res) => {
    res.send("Website In Beta")
  });

  app.listen(3000, () => { });
}