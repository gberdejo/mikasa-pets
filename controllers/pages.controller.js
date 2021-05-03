const helper = require("../helpers");
const productService = require("../services/product.service");
const pageController = {
  homeClient: async (req, res) => {
    const list_product = await productService.listProduct();
    return res.render("client/home_client", {
      usersession: req.session.usersession,
      list_product,
    });
  },
  homeAdmin: async (req, res) => {
    const list_product = await productService.listProduct();
    return res.render("admin/home_admin", {
      list_product,
    });
  },
  home: async (req, res) => {
    const list_product = await productService.listProduct();
    return res.render("home", {
      list_product,
    });
  },
  login: (req, res) => res.render("client/auth/login"),
  register: (req, res) => res.render("client/auth/register"),
  redirectionHome: (req, res) => res.render("home"),
  registerPet: (req, res) => {
    return res.render("client/register_pet", {
      userid: req.session.userid,
    });
  },
  listPet: (req, res) => res.render("client/list_pet"), //page list
  registerProduct: (req, res) => res.render("admin/register_product"), //form
  listProduct: async (req, res) => {
    // tablas detalles de producto
    const list_product = await productService.listProduct();
    return res.render("admin/list_product", {
      list_product,
    });
  },
};

module.exports = pageController;
