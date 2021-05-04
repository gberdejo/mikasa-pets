const bcrypt = require("bcryptjs");
const passport = require("passport");
const clientService = require("../services/client.service");
const productService = require("../services/product.service");
const sessionController = {};

sessionController.loginSession = async (req, res) => {
  const { email, password } = req.body;
  const client = await clientService.findClientEmail(email);
  if (!client) return res.redirect("/login");

  if (bcrypt.compareSync(password, client.password_client)) {
    req.session.usersession = client.name_client;
    req.session.userid = client.id;
    return res.redirect("/home-client");
  } else {
    return res.redirect("/login");
  }
};
sessionController.exitSession = async (req, res) => {
  req.session.destroy(async () => {
    console.log("------> se destruyo la sesion");
    return res.redirect("/");
  });
};

module.exports = sessionController;
