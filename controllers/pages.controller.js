const helper = require("../helpers");
const productService = require("../services/product.service");
const pageController = {
    homeClient: async(req, res) => {
        try {
            const list_product = await productService.listProduct();
            res.render("client/home_client", {
                list_product
            });
        } catch (err) {
            console.log(err);
            res.render("client/home_client");
        }
    },
    homeAdmin: async(req, res) => {
        try {
            const list_product = await productService.listProduct();
            res.render("admin/home_admin", {
                list_product,
            });
        } catch (err) {
            console.log(err);
            res.render("admin/home_admin");
        }
    },
    home: async(req, res) => {
        try {
            const list_product = await productService.listProduct();
            return res.render("home", {
                list_product,
            });
        } catch (err) {
            console.log(err);
            return res.render("home");
        }
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
    listProduct: async(req, res) => {
        // tablas detalles de producto
        try {
            const list_product = await productService.listProduct();
            res.render("admin/list_product", {
                list_product,
            });
        } catch (error) {
            res.render("admin/list_product");
        }
    },
};

module.exports = pageController;