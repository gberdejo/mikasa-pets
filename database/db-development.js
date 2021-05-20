const config = require('config');
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
    config.get('mysql.database'),
    config.get('mysql.user'),
    config.get('mysql.password'), {
        host: config.get('mysql.host'),
        dialect: config.get('mysql.dialect'),
        port: config.get('mysql.port')
    }
);
module.exports = sequelize;