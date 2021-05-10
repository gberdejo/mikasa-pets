const {request} = require('express');
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
  console.log(req.body);
  const img1 = "img1";
  const img2 = "img2";
  const img3 = "img3";
  const {name,precio,stock,description_simple,description_html} = req.body;
  const obj = {name,precio,stock,description_simple,description_html,img1,img2,img3,employeeId:req.user.id};
  console.log(obj);
  const product = await productService.createProduct(obj);
  if (!product) return res.redirect("/create-product");
  req.flash("success", `Se a guardado satisfactoriamente ${req.user.id}`);
  res.redirect("/create-product");
};
productController.deleteProduct = async (req = request,res )=>{
  console.log(req.params.id);
  const product = await productService.deleteProduct(req.params.id);
  if(!product){
    req.flash('error','Hubo un error a la hora de eliminar el producto');
    return res.redirect('/list-product');
  }
  req.flash('success',`El producto ${req.params.id} se elimino correctamente`);
  res.redirect('/list-product');

};
productController.renderUpdateProduct = async (req,res) => {
  const product = await productService.getProduct(req.params.id);
  if(!product) {
    req.flash('error','Ocurrio un error o el producto fue eliminado');
    return res.redirect('/list-product');
  }
  console.log(product);
  res.render('product_update',{product:[product]});
}
productController.updateProduct = async (req,res)=>{
  console.log(req.body);
  const img1 = "img1";
  const img2 = "img2";
  const img3 = "img3";
  const {name,precio,stock,description_simple,description_html} = req.body;
  const obj = {name,precio,stock,description_simple,description_html,img1,img2,img3,id:req.params.id};
  const product =await productService.updateProduct(obj);
  if(!product) return res.redirect('/')
}

module.exports = productController;
