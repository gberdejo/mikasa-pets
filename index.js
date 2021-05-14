require("dotenv").config();
const app = require("./app");
global.DOMAIN = "mikasa.pet";

app.listen(process.env.PORT, () => {
  console.log("Runn server");
});
