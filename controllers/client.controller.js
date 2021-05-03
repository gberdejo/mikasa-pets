const { response } = require("express");
const clientService = require("../services/client.service");
const productService = require("../services/product.service");
const clientController = {
  createUser: async (req, res = response) => {
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
    const clientExists = await clientService.findClientEmail(email_client);
    if (clientExists) return res.redirect("client/auth/register");

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
    if (client) {
      req.session.usersession = client.name_client;
      req.session.userid = client.id;
      const list_product = await productService.listProduct();
      return res.render("client/home_client", {
        usersession: req.session.usersession,
        list_product,
      });
    } else {
      console.log(error);
      return res.render("client/auth/register");
    }
  },
};
module.exports = clientController;
