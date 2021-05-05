const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const clientService = require("../services/client.service");
const Client = require("../models/client");
const bcrypt = require("bcryptjs");
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (username, password, done) => {
      if (username !== "gabriel@hotmail.com") {
        return done(null, null, { message: "El usuario no existe" });
      } else {
        if (password !== "123") {
          return done(null, null, { message: "La contrasela es incorrecta" });
        }
        return done(null, { id: 1, name: "gabriel" });
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, { id: 1, name: "gabriel" });
});
