const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mikasapet', 'root', 'mysql', {
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = sequelize;