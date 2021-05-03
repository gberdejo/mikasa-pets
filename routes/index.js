const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const clientController = require("../controllers/client.controller");
const pageController = require("../controllers/pages.controller");
const mid = require("../middlewares");
const petController = require("../controllers/pet.controller");
const sessionController = require("../controllers/session.controller");
const productController = require("../controllers/product.controller");
//pages
router.get("/", pageController.home);
router.get("/login", pageController.login);
router.get("/register", pageController.register);
router.get("/register-pet", pageController.registerPet);
router.get("/list-pet", petController.listPet);
router.get("/home-client", pageController.homeClient);

router.get("/home-admin", pageController.homeAdmin);
router.get("/list-product", pageController.listProduct);
router.get("/register-product", pageController.registerProduct);
router.post("/products", productController.createProduct);

router.post("/pets", petController.createPet);
router.get("/pets", petController.listPet);

router.post("/clients", clientController.createUser);
router.post("/session", sessionController.loginSession);
router.get("/exit", sessionController.exitSession);

//sin ruta
/*router.get('*', [
], pageController.redirectionHome);*/
module.exports = router;
