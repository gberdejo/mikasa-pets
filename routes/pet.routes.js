const { Router } = require("express");
const routerPet = Router();
const petController = require("../controllers/pet.controller");
const helper = require("../helpers/index");

routerPet.get("/my-pets", [helper.isAuthenticated], petController.renderMyPets);
routerPet.get("/register-my-pets", petController.renderRegisterPet);

module.exports = routerPet;
