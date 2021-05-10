const { Router } = require("express");
const router = Router();
const productController = require("../controllers/product.controller");

const { isAuthenticated } = require('../helpers');
router.get("/list-product", [isAuthenticated], productController.renderListProduct);
router.get("/create-product", [isAuthenticated], productController.renderCreateProduct);
router.post("/products", [isAuthenticated], productController.createProduct);
router.post("/delete-product/:id", [isAuthenticated], productController.deleteProduct);
router.get("/update-product/:id", [isAuthenticated], productController.renderUpdateProduct);
router.post("/update-product/:id", [isAuthenticated], productController.updateProduct);


module.exports = router;