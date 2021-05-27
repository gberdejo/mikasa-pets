require("dotenv").config();
const app = require("./app");
const sequelize = require('./database/index');

//sequelize.sync({ force: true }).then(() => console.log('sync go!'));
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