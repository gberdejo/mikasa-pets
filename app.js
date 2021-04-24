const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const express_handlebars = require('express-handlebars');

const session = require('express-session');
class App {
    constructor() {
        this._app = express();
        this._port = process.env.PORT;
        this.settings();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this._app.use(cors());
        this._app.use(morgan('dev'))

        this._app.use(express.json());
        this._app.use(express.urlencoded({ extended: true }));

        this._app.use(express.static('public'));
        this._app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false, maxAge: 60000 }
        }));

    }
    routes() {
        this._app.use('/', require('./routes/index'));
    };
    settings() {
        this._app.engine('hbs', express_handlebars({
            defaultLayout: 'main',
            layoutsDir: __dirname + "/views/layouts",
            partialsDir: __dirname + "/views/partials",
            extname: 'hbs'
        }));
        this._app.set('view engine', 'hbs');
    };

    listen() {

        this._app.listen(this._port, async() => {
            console.log(`Server on Port: ${this._port}`);
        })
    }
}
module.exports = App;