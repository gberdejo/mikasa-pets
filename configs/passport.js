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
    async (email, password, done) => {
      const client = await clientService.findClientEmail(email);
      if (!client) {
        return done(null, false, { message: "El Cliente no existe" });
      } else {
        if (bcrypt.compareSync(password, client.password_client)) {
          return done(null, client);
        } else {
          return done(null, false, { message: "Comtraseña incorrecta" });
        }
      }
    }
  )
);
passport.serializeUser((client, done) => {
  done(null, client.id);
});
passport.deserializeUser((id, done) => {
  Client.findOne({ where: { id } }, (err, client) => {
    done(err, client);
  });
});
