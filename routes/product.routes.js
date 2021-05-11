const { Router } = require("express");
const router = Router();
const productController = require("../controllers/product.controller");

const { isAuthenticated } = require('../helpers');

router.get('/product',productController.renderProduct);
router.get('/vet',productController.renderVet);

router.get("/list-product", [isAuthenticated], productController.renderListProduct);
router.get("/create-product", [isAuthenticated], productController.renderCreateProduct);
router.post("/create-product", [isAuthenticated], productController.createProduct);
router.post("/delete-product/:id", [isAuthenticated], productController.deleteProduct);
router.get("/update-product/:id", [isAuthenticated], productController.renderUpdateProduct);
router.post("/update-product/:id", [isAuthenticated], productController.updateProduct);

router.get('/list-vet',[isAuthenticated],productController.renderLisVet);
router.get('/create-vet',[isAuthenticated],productController.renderCreateVet);
router.post('/create-vet',[isAuthenticated],productController.createVet);
module.exports = router;