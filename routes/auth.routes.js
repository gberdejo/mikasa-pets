const { Router } = require("express");
const router = Router();
const authController = require("../controllers/auth.controller");
const { isAuthenticated } = require('../helpers');
router.get("/", authController.renderHome);
router.get("/login", authController.renderLogin);
router.post("/login", authController.login);
router.get("/signup", authController.renderSignUp);
router.post("/signup", authController.signUp);
router.get("/exit", [isAuthenticated], authController.logout);

//employees
router.get('/signup-admin', authController.renderSignUpAdmin);
router.post('/signup-admin', authController.signUpAdmin);
module.exports = router;