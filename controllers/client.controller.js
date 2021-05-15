const { response } = require("express");
const clientService = require("../services/client.service");
const productService = require("../services/product.service");
const clientController = {};

clientController.renderProfile = (req,res)=> res.render('profile');
module.exports = clientController;
