const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  'mikasapet' ,
  'root',
  'mysql',
  {
    host: 'localhost',
    dialect: "mysql",
    port:3306
  }
);
module.exports = sequelize;