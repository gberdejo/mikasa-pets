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
    name,
    lastname,
    birthdata,
    direction,
    nick,
    phone,
    email,
    password,
  } = req.body;
  const clientExists = await clientService.getClientbyEmail(email);
  if (clientExists) {
    req.flash("error", "El Usuario ya existe");
    return res.redirect("/signup");
  }

  const client = await clientService.registerClient({
    name,
    lastname,
    birthdata,
    direction,
    nick,
    phone,
    email,
    password,
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
