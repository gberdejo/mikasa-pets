const app = require("./app");
global.DOMAIN = "mikasa.pet";
require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log("Runn server");
});
