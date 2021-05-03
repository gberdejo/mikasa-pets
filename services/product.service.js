const Product = require("../models/product");
const { Op } = require("sequelize");

const productService = {};

productService.createProduct = async (obj) => {
  try {
    const product = await Product.build(obj);
    if (product instanceof Product) {
      await product.save();
      return product;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
productService.listProduct = async () => {
  let list = [];
  try {
    const raw = await Product.findAll();
    if (raw.length >= 0) {
      raw.map((products) => {
        list.push(products.dataValues);
      });
      return list;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = productService;
