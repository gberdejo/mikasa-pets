const Product = require('../models/product');
const { response} = require('express');
const productController = {
    createProduct :async (req,res = response)=>{
       try {
        const {name_product,precio_product,stock_product,description_simple_product,
            description_hmtl_product,img1_product,img2_product,img3_product,
            employeeId} = req.body;
        const product = Product.build({name_product,precio_product,stock_product,description_simple_product,
            description_hmtl_product,img1_product,img2_product,img3_product,
            employeeId});
        console.log(product);
        await product.save();

        return res.json({
            msg : "tODO ok ",
            product
        });
        } catch (error) {
          console.log(error);
          return res.json({
              msg: "trodo se derumbo"
          }) 
        }
        },
    
}
module.exports = productController;