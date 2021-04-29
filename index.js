const App = require('./app');
global.DOMAIN = "mikasa.pet";
require('dotenv').config();

const app = new App();
app.listen();