require("dotenv").config();
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
const options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mysql",
  database: "sessionstore",
};
require("./configs/passport");

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
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

app.use(flash());
app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  if (typeof req.user === "undefined") {
    res.locals.user = null;
  } else {
    res.locals.user = [req.user];
  }
  next();
});

//Routes
app.use("/", require("./routes/auth.routes"));
app.use("/", require("./routes/client.routes"));
app.use("/", require("./routes/pet.routes"));

//Static
app.use(express.static("public"));

//Default
app.use((req, res) => {
  res.render("404");
});

module.exports = app;
