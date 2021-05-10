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
productService.getProduct = async (id) => {
  try {
    const product = await Product.findOne({
      where:{
        id:{
          [Op.eq] : id
        }
      }
    });
    if(!product) return null;
    return product.dataValues;
  } catch (error) {
    console.log(error);
    return null;
  }
}
productService.getlistProduct = async ()=> {
  let list = [];
  try {
    const raw = await Product.findAll({
      where:{
        status:{
          [Op.eq]:1
        }
      }
    });
    if (raw.length >= 0) {
      raw.map((products) => {
        list.push(products.dataValues);
      });
      return list;
    }
    return list;
  } catch (error) {
    console.log(error);
    return list;
  }
};
productService.deleteProduct = async (id)=>{
  try {
    const product = await Product.update({status : 0},{
    where:{
      id:{
        [Op.eq]: id
      }
    }
  });
  console.log(product);
  if(!product) return null;
  return product;
  } catch (error) {
    console.log(error);
    return null;
  }
}
productService.updateProduct = async (obj)=> {
  try {
    const product = await Product.update({
      name : obj.name,
      precio : obj.precio,
      stock : obj.stock,
      description_simple : obj.description_simple,
      description_html : obj.description_html,
      img1 : obj.img1,
      img2 : obj.img2,
      img3 : obj.img3,
    },{
      where :{
        id :{
          [Op.eq]: obj.id
        }
      }
    });
    if(!product) return null;
    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
}
module.exports = productService;
