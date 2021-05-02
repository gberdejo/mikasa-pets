const Product = require('../models/product');
const { response} = require('express');
const helper = require('../helpers');
const productController = {
    createProduct :async (req,res = response)=>{
       try {
        const {name_product,precio_product,stock_product,description_simple_product,
            description_hmtl_product,img1_product,img2_product,img3_product,
            employeeId} = req.body;
            console.log(req.body);
        const product = Product.build({
            name_product,
            precio_product,
            stock_product,
            description_simple_product,
            description_hmtl_product,
            img1_product ,
            img2_product ,
            img3_product,
            employeeId});
        console.log(product);
        await product.save();
        
        const list_product = await helper.listProduct();
        return res.render('admin/list_product',{
            list_product
        });
        } catch (error) {
          console.log(error);
          return res.render('admin/list_product');
        }
        }
        
    
}
module.exports = productController;