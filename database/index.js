
let sequelize;
if(process.env.NODE_ENV === 'development'){
  sequelize = require('./db-development');
}
if(process.env.NODE_ENV === 'production'){
  sequelize = require('./db-production');
}
module.exports = sequelize;