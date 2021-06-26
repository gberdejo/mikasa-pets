const { Router } = require('express');
const upload = require('../settings/multer');
const router = Router();
const { isAuthenticated } = require('../helpers');
const config = require('config');
const path = require('path');
const fs = require('fs');
const pro = require('../controllers/product.controller');

//TODO Paginas Publicas
router.get('/vet', pro.renderVet);
router.get('/product', pro.renderProduct);

//TODO Crear productos
router.get('/list-product', [isAuthenticated], pro.renderListProduct);
router.get('/create-product', [isAuthenticated], pro.renderCreateProduct);
router.post(
  '/create-product',
  [isAuthenticated],
  upload.single('avatar'),
  pro.createProduct
);
router.post('/delete-product/:id', [isAuthenticated], pro.deleteProduct);
router.get('/update-product/:id', [isAuthenticated], pro.renderUpdateProduct);
router.post('/update-product/:id', [isAuthenticated], pro.updateProduct);

//TODO Crear servicios veterinario
router.get('/list-vet', [isAuthenticated], pro.renderLisVet);
router.get('/create-vet', [isAuthenticated], pro.renderCreateVet);
router.post(
  '/create-vet',
  [isAuthenticated],
  upload.single('avatar'),
  pro.createVet
);
router.get('/update-vet/:id', [isAuthenticated], pro.renderUpdateVet);
router.post('/update-vet/:id', [isAuthenticated], pro.updateVet);
router.post('/delete-vet/:id', [isAuthenticated], pro.deleteVet);

//TODO Carrito de compras
router.post('/add-product', [isAuthenticated], pro.addProducttoCart);
router.get('/cart', [isAuthenticated], pro.renderShoppingCart);
router.get('/pasarela-product', [isAuthenticated], pro.renderPasarelaProduct);
router.post('/pasarela-vet', [isAuthenticated], pro.renderPasarelaVet);
router.post('/delete-item-cart', [isAuthenticated], pro.deleteItemCart);
router.post('/buy-product', [isAuthenticated], pro.buyProduct);
router.post('/buy-vet', [isAuthenticated], pro.buyVet);

//TODO Veterinaria
router.get('/programar-cita/:id', [isAuthenticated], pro.renderProgramarCita);

router.get('/images/:name', async (req, res) => {
  fs.readFile(
    path.join(config.get('path.edits'), req.params.name),
    function (err, data) {
      if (!err) {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(data, 'binary');
      } else {
        res.status(400).json('Not Found');
      }
    }
  );
});
module.exports = router;
