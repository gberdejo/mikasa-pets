require("dotenv").config();
const app = require("./app");
const sequelize = require('./database/index');
global.DOMAIN = "mikasa.pet";

sequelize.authenticate()
    .then(() => {
        console.log('Go DataBase!');

        const server = app.listen(app.get('port'), () => {
            console.log("Run Server on port: " + app.get('port'));
        }, );

        process.on('SIGTERM', () => {
            server.close(() => {
                console.log('Proceso Terminado')
            })
        })

    })
    .catch((err) => {

        console.log(err);
    })