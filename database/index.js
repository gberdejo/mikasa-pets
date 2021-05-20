const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME || 'mikasapet',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || 'mysql', {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        logging: false,
        dialect: 'mysql',
        dialectOptions: {
            ssl: process.env.DB_SSL || false
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    }
);
module.exports = sequelize;