require("dotenv").config();
const config = require('config');
const app = require("./app");
const sequelize = require('./database/index');
global.DOMAIN = "mikasa.pet";

sequelize.authenticate()
    .then(() => {
        console.log('Go DataBase!');
        app.listen(process.env.PORT, () => {
            console.log("Run Server on port: " + config.get('server.PORT'));
        });
    })
    .catch((err) => {
        console.log(err);
    })