require("dotenv").config();
const app = require("./app");
const sequelize = require('./database/index');

//sequelize.sync({ alter: true }).then(() => console.log('sync go!'));
sequelize.authenticate()
    .then(() => {
        console.log('Go DataBase!');

        const server = app.listen(app.get('port'), () => {
            console.log("Run Server on port: " + app.get('port'));
        }, );
        console.log('variables de entorno');
        console.log(process.env.AWS_BUCKET_NAME);
        console.log(process.env.AWS_BUCKET_REGION);
        console.log(process.env.AWS_ACCESS_KEY);
        console.log(process.env.AWS_SECRET_KEY);

        process.on('SIGTERM', () => {
            server.close(() => {
                console.log('Proceso Terminado')
            })
        })

    })
    .catch((err) => {

        console.log(err);
    })