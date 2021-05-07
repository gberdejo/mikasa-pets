const { Router } = require("express");
const router = Router();
const authController = require("../controllers/auth.controller");
const petController = require("../controllers/pet.controller");
router.get("/", authController.renderHome);
router.get("/login", authController.renderLogin);
router.post("/login", authController.login);
router.get("/signup", authController.renderSignUp);
router.post("/signup", authController.signUp);
router.get("/exit", authController.logout);

router.post("/pets", petController.createPet);
module.exports = router;
