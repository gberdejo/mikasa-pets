const { response } = require("express");
const clientService = require("../services/client.service");
const productService = require("../services/product.service");
const clientController = {};

clientController.renderProfileClient = (req, res) => res.render('profile_client');
module.exports = clientController;