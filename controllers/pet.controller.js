const Pet = require("../models/pet");
const petService = require("../services/pet.service");
const { response } = require("express");
const petController = {
  createPet: async (req, res = response) => {
    const { name_pet, birthdata_pet } = req.body;
    const pet = await petService.createPet({
      name_pet,
      birthdata_pet,
      clientId: req.session.userid,
    });
    if (pet) {
      return res.redirect("/list-pet");
    }
    return res.redirect("/register-pet");
  },
  listPet: async (req, res) => {
    const list_pet = await petService.listPetClient(req.session.userid);
    if (list_pet) {
      return res.render("client/list_pet", {
        usersession: req.session.usersession,
        list_pet,
      });
    } else {
      return res.render("client/register_pet", {
        usersession: req.session.usersession,
      });
    }
  },
};

module.exports = petController;
