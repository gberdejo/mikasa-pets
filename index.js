// require('dotenv').config();
const app = require('./app');
const sequelize = require('./database/index');
const config = require('config');
const fs = require('fs');
const Track = require('./models/track');

// sequelize.sync({ alter: true });
sequelize
  .authenticate()
  .then(() => {
    console.log('Go DataBase!');
    const server = app.listen(app.get('port'), () => {
      console.log('Run Server on port: ' + app.get('port'));
      fs.access(config.get('path.uploads'), (err) => {
        if (err) {
          fs.mkdir(config.get('path.uploads'), (err) => {
            if (!err) {
              console.log('FOLDER Uploads CREATED');
              fs.mkdir(config.get('path.edits'), (err) => {
                if (!err) console.log('FOLDER EDITS CREATED');
              });
            }
          });
        }
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
