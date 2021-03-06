const express = require('express');
const app = express();
const express_handlebars = require('express-handlebars');

const config = require('config');
const cors = require('cors');
const morgan = require('morgan');

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const passport = require('passport');

//config passport-MySql
const options = {
  host: config.get('mysql.host'),
  port: config.get('mysql.port'),
  user: config.get('mysql.user'),
  password: config.get('mysql.password'),
  database: config.get('mysql.databaseSession'),
};
require('./settings/passport');

//settings
app.engine(
  '.hbs',
  express_handlebars({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs');

app.set('port', config.get('server.port'));
//middlewares
app.use(cors());
app.use(morgan(config.get('morgan')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser('Es un secreto'));
app.use(
  session({
    secret: 'Es otro secreto',
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
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');

  if (typeof req.user === 'undefined') {
    res.locals.user = null;
  } else {
    res.locals.user = [req.user];
    res.locals.client = req.user.role === 'CLIENTE' ? 'CLIENTE' : null;
    res.locals.seller = req.user.role === 'VENDEDOR' ? 'VENDEDOR' : null;
    res.locals.veterinary =
      req.user.role === 'VETERINARIO' ? 'VETERINARIO' : null;
    console.log(`Role --->> ${req.user.role}`);
  }
  next();
});

//Routes
app.use('/', require('./routes/auth.routes'));
app.use('/', require('./routes/client.routes'));
app.use('/', require('./routes/pet.routes'));
app.use('/', require('./routes/product.routes'));
app.use('/', require('./routes/employee.routes'));

//Static
app.use(express.static('public'));

//Default
app.use((req, res) => {
  res.render('404');
});

module.exports = app;
