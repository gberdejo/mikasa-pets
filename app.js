const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const hbs = require('hbs');
class App{
    constructor(){
        this._app = express();
        this._port = process.env.PORT;
        this.settings();
        this.middlewares();
        this.router();
    }
    middlewares(){
        this._app.use(cors());
        this._app.use(morgan('dev'))

        this._app.use(express.static('public'));
        this._app.use(express.json());

    }
    router(){
        this._app.get('/',require('./routes'));
    }
    settings(){
        this._app.set('view engine', 'hbs');
        hbs.registerPartials(__dirname+'/views/partials'       );        
    }

    listen(){
        this._app.listen(this._port,()=>{
            console.log(`Server on Port: ${this._port}`);
        })
    }
}
module.exports = App;