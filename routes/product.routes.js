const { Router } = require("express");
const router = Router();
const productController = require("../controllers/product.controller");

router.get("/list-product", productController.renderListProduct);
router.get("/create-product", productController.renderCreateProduct);
router.post("/products", productController.createProduct);
router.post("/delete-product/:id",productController.deleteProduct);
router.get("/update-product/:id",productController.renderUpdateProduct);
router.post("/update-product/:id",productController.updateProduct);


module.exports = router;
