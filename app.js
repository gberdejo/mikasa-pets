const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const express_handlebars = require("express-handlebars");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const PassportLocal = require("passport-local").Strategy;
const options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mysql",
  database: "sessionstore",
};
//require("./configs/passport");

//settings
app.engine(
  ".hbs",
  express_handlebars({
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

//middlewares
require("dotenv").config();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("Es un secreto"));
app.use(
  session({
    secret: "Es otro secreto",
    store: new MySQLStore(options),
    resave: true,
    saveUninitialized: true,
    //cookie: { secure: false, maxAge: 60000 }
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new PassportLocal(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (username, password, done) => {
      if (username === "gabriel@hotmail.com" && password === "123") {
        return done(null, { id: 1, name: "gabriel" });
      }
      return done(null, null, { message: "Credenciales incorrectas" });
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, { id: 1, name: "gabriel" });
});
app.use(flash());
/*app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        res.locals.user = req.user || null;
  res.locals.error = req.flash("error");
  res.locals.usersession = req.user || null;
  next();
})*/

//Routes
app.use("/", require("./routes/index"));

//Static
app.use(express.static("public"));

//Default
app.use((req, res) => {
  res.render("404");
});

module.exports = app;
