const express = require('express');
const http = require('http');
const url = require('url');
const path = require('path');
const bodyParser = require('body-parser')
const ejs = require('ejs');
const fs = require('fs')
const passport = require('passport');
const Strategy = require('passport-discord').Strategy;


module.exports = (client) => {
  const app = express();
  const httpapp = express();
  const session = require('express-session');
  const MemoryStore = require('memorystore')(session);

  /** 
  *PASSPORT SETTINGS
  */

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));
  passport.use(new Strategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "https://cookiez.ml/callback",
    scope: [`identify`, `guilds`]
  },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile));
    }));

  /** 
  *ADD A SESSION
  */

  app.use(session({
    store: new MemoryStore({ checkPeriod: 86400000 }),
    secret: "verysecret",
    resave: false,
    saveUninitialized: false,
  }));

  /** 
  *INITILIZE PASSPORT
  */

  app.use(passport.initialize());
  app.use(passport.session());

  /** 
  *SET VIEWS
  */

  app.set('view engine', "ejs");
  app.set('views', path.join(__dirname, "views"));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extented: true }));

  /** 
  *LOAD THE ACS
  */

  app.use(express.static(path.join(__dirname, "/public")));
  app.use(express.static(path.join(__dirname, "/"), { dotfiles: "allow" }))

  //checkAuth 
  const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
  }

  //login user
  app.get(`/login`, (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL;
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = `/`;
    }
    next();
  }, passport.authenticate(`discord`, { prompt: `none` })
  );

  //Callback endpoint for the login data
  app.get(`/callback`, passport.authenticate(`discord`, { failureRedirect: "/" }), async (req, res) => {
    let banned = false // req.user.id
    if (banned) {
      req.session.destroy(() => {
        res.json({ login: false, message: `You have been blocked from the Dashboard.`, logout: true })
        req.logout();
      });
    } else {
      res.redirect(`/`)
    }
  });

  app.get('/', (req, res) => {
    const { PermissionsBitField } = require('discord.js')
    res.render("index.ejs", {
      req: req,
      bot: client,
      user: req.isAuthenticated() ? req.user : null,
      Permissions: PermissionsBitField,
      commands: client.commands,
      category: client.category,
    })
  });

  app.get("/dashboard", checkAuth, async (req, res) => {
    if (!req.isAuthenticated() || !req.user) {
      return res.redirect("/?error=" + encodeURIComponent("LoginFirst"));
    }
    if (!req.user.guilds) {
      return res.redirect("/?error=" + encodeURIComponent("Unable to get your Guilds!"));
    }
    const { PermissionsBitField } = require('discord.js')
    res.render("dashboard", {
      req: req,
      user: req.isAuthenticated() ? req.user : null,
      bot: client,
      Permissions: PermissionsBitField,
      callback: "https://cookiez.ml/callback",
      categories: client.category,
      commands: client.commands,
    });
  });


  const http = require('http').createServer(app)
  http.listen(80, () => console.log("Loaded"))
}