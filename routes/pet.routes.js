const { Router } = require("express");
const router = Router();

const upload = require('../configs/multer');
const petController = require("../controllers/pet.controller");

const { isAuthenticated } = require('../helpers');


router.get("/my-pets", [isAuthenticated], petController.renderMyPets);
router.get("/register-my-pets", [isAuthenticated],upload.single('avatar'),petController.renderRegisterPet);
router.post("/pets", [isAuthenticated], petController.createPet);

module.exports = router;