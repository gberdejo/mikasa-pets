const { Router } = require("express");
const router = Router();
const productController = require("../controllers/product.controller");

router.get("/list-products", productController.renderListProduct);
router.get("/create-product", productController.renderCreateProduct);
module.exports = router;
