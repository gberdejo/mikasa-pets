const { Sequelize } = require("sequelize");
const config = require('config');
const sequelize = new Sequelize(
    config.get('mysql.database'),
    config.get('mysql.user'),
    config.get('mysql.password'), {
        host: config.get('mysql.host'),
        port: config.get('mysql.port'),
        logging: false,
        dialect: 'mysql',
        dialectOptions: {
            ssl: config.get('mysql.ssl')
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    }
);
module.exports = sequelize;