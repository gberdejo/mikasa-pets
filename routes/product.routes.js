const { Router } = require("express");
const upload = require('../settings/multer');
const router = Router();
const { isAuthenticated } = require('../helpers');

const productController = require("../controllers/product.controller");

/* Paginas Publicas */
router.get('/vet', productController.renderVet);
router.get('/product', productController.renderProduct);

/* Crear productos */
router.get("/list-product", [isAuthenticated], productController.renderListProduct);
router.get("/create-product", [isAuthenticated], productController.renderCreateProduct);
router.post("/create-product", [isAuthenticated], upload.single('avatar'), productController.createProduct);
router.post("/delete-product/:id", [isAuthenticated], productController.deleteProduct);
router.get("/update-product/:id", [isAuthenticated], productController.renderUpdateProduct);
router.post("/update-product/:id", [isAuthenticated], productController.updateProduct);

/* Crear servicios veterinario */
router.get('/list-vet', [isAuthenticated], productController.renderLisVet);
router.get('/create-vet', [isAuthenticated], productController.renderCreateVet);
router.post('/create-vet', [isAuthenticated], upload.single('avatar'), productController.createVet);

/* Carrito de compras */
router.post('/add-product', [isAuthenticated], productController.addProducttoCart);
router.get('/cart', [isAuthenticated], productController.renderShoppingCart);
//router.get('/shopping-cart', productController.shoppingCart);

module.exports = router;