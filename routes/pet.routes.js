const { Router } = require("express");
const router = Router();
const petController = require("../controllers/pet.controller");
const helper = require("../helpers/index");

router.get("/my-pets", [helper.isAuthenticated], petController.renderMyPets);
router.get("/register-my-pets", [helper.isAuthenticated], petController.renderRegisterPet);

router.post("/pets", petController.createPet);

module.exports = router;