const { Op } = require("sequelize");
const helper = require("../helpers");
const bcrypt = require("bcryptjs");
const clientService = require("../services/client.service");
const productService = require("../services/product.service");
const sessionController = {
  loginSession: async (req, res) => {
    const { email, password } = req.body;
    const client = await clientService.findClientEmail(email);
    if (!client) return res.render("client/auth/login");

    if (bcrypt.compareSync(password, client.password_client)) {
      const list_product = await productService.listProduct();
      req.session.usersession = client.name_client;
      req.session.userid = client.id;
      return res.render("client/home_client", {
        usersession: req.session.usersession,
        list_product,
      });
    } else {
      return res.redirect("client/auth/login");
    }
  },
  exitSession: async (req, res) => {
    req.session.destroy(() => {
      console.log("--> se destruyo la sesion");
    });
    const list_product = await helper.listProduct();
    return res.render("home", {
      list_product,
    });
  },
};
module.exports = sessionController;
