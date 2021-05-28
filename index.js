require("dotenv").config();
const app = require("./app");
const sequelize = require('./database/index');
const config = require('config');
const fs = require('fs').promises;

//sequelize.sync({ force: true }).then(() => console.log('sync go!'));

  

fs.access(config.get('path.uploads'))
    .catch((err)=>{ 
        fs.mkdir(config.get('path.uploads'));
});
sequelize.authenticate() 
    .then(() => {
        console.log('Go DataBase!');

        const server = app.listen(app.get('port'), 
        () => {
            console.log("Run Server on port: " + app.get('port')); 
        }, );
    })
    .catch((err) => {
        console.log(err);
    })