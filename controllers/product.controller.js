const productService = require("../services/product.service");
const productController = {};

productController.renderListProduct = async (req, res) => {
  const products = await productService.getlistProduct();
  res.render("product_list", { products });
};
productController.renderCreateProduct = async (req, res) => {
  res.render("product_register");
};
productController.createProduct = async (req, res) => {
  const {
    name,
    precio,
    stock,
    description_simple,
    description_html,
    img1,
    img2,
    img3,
  } = req.body;
  const obj = {
    name,
    precio,
    stock,
    description_simple,
    description_html,
    img1,
    img2,
    img3,
  };
  const product = await productService.createProduct(obj);
  if (!product) return res.redirect("/create-product");
  req.flash("success", "Se a guardado satisfactoriamente");
  res.redirect("/create-product");
};

module.exports = productController;
