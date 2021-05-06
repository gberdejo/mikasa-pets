const passport = require("passport");
const bcrypt = require("bcryptjs");
const clientService = require("../services/client.service");
const productService = require("../services/product.service");
const authController = {};
authController.renderHome = (req, res) => res.render("home");
authController.renderLogin = (req, res) => res.render("login");
authController.login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: {
    type: "error",
  },
  failureMessage: true,
});
authController.renderSignUp = (req, res) => res.render("signup");
authController.signUp = async (req, res) => {
  const {
    name_client,
    lastname_client,
    birthdata_client,
    direction_client,
    nick_client,
    phone_client,
    email_client,
    password_client,
  } = req.body;
  const clientExists = await clientService.getClientbyEmail(email_client);
  if (clientExists) {
    req.flash("error", "El Usuario ya existe");
    return res.redirect("/signup");
  }

  const client = await clientService.registerClient({
    name_client,
    lastname_client,
    birthdata_client,
    direction_client,
    nick_client,
    phone_client,
    email_client,
    password_client,
  });
  if (client) return res.redirect("/login");

  return res.redirect("/signup");
};
authController.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
/*sessionController.exitSession = async (req, res) => {
  req.session.destroy(async () => {
    console.log("------> se destruyo la sesion");
    return res.redirect("/");
  });
};*/

module.exports = authController;
