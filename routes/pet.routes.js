const { Router } = require("express");
const router = Router();

const upload = require('../configs/multer');
const petController = require("../controllers/pet.controller");

const { isAuthenticated } = require('../helpers');


router.get("/my-pets", [isAuthenticated], petController.renderMyPets);
router.get("/register-my-pets", [isAuthenticated],petController.renderRegisterPet);
router.post("/pets", [isAuthenticated],upload.single('avatar'), petController.createPet);

router.post('/pets/:id',[isAuthenticated],petController.deletePet);
module.exports = router;