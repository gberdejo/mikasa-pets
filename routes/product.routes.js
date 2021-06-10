const { Router } = require("express");
const upload = require("../settings/multer");
const router = Router();
const { isAuthenticated } = require("../helpers");
const config = require("config");
const path = require("path");
const fs = require("fs");
const productController = require("../controllers/product.controller");

/* Paginas Publicas */
router.get("/vet", productController.renderVet);
router.get("/product", productController.renderProduct);

/* Crear productos */
router.get(
  "/list-product",
  [isAuthenticated],
  productController.renderListProduct
);
router.get(
  "/create-product",
  [isAuthenticated],
  productController.renderCreateProduct
);
router.post(
  "/create-product",
  [isAuthenticated],
  upload.single("avatar"),
  productController.createProduct
);
router.post(
  "/delete-product/:id",
  [isAuthenticated],
  productController.deleteProduct
);
router.get(
  "/update-product/:id",
  [isAuthenticated],
  productController.renderUpdateProduct
);
router.post(
  "/update-product/:id",
  [isAuthenticated],
  productController.updateProduct
);
router.post(
  "/delete-item-cart",
  [isAuthenticated],
  productController.deleteItemCart
);
router.post("/buy-product", [isAuthenticated], productController.buyProduct);

/* Crear servicios veterinario */
router.get("/list-vet", [isAuthenticated], productController.renderLisVet);
router.get("/create-vet", [isAuthenticated], productController.renderCreateVet);
router.post(
  "/create-vet",
  [isAuthenticated],
  upload.single("avatar"),
  productController.createVet
);
router.get(
  "/update-vet/:id",
  [isAuthenticated],
  productController.renderUpdateVet
);
router.post("/update-vet/:id", [isAuthenticated], productController.updateVet);
router.post("/delete-vet/:id", [isAuthenticated], productController.deleteVet);

/* Carrito de compras */
router.post(
  "/add-product",
  [isAuthenticated],
  productController.addProducttoCart
);
router.get("/cart", [isAuthenticated], productController.renderShoppingCart);
router.get(
  "/pasarela-product",
  [isAuthenticated],
  productController.renderPasarelaProduct
);
//router.get('/shopping-cart', productController.shoppingCart);

router.get("/images/:name", async (req, res) => {
  fs.readFile(
    path.join(config.get("path.edits"), req.params.name),
    function (err, data) {
      if (!err) {
        res.writeHead(200, { "Content-Type": "image/png" });
        res.end(data, "binary");
      } else {
        res.status(400).json("Not Found");
      }
    }
  );
});
module.exports = router;
