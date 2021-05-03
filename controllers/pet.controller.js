const Pet = require("../models/pet");
const petService = require("../services/pet.service");
const petController = {
  createPet: async (req, res) => {
    const { name_pet, birthdata_pet } = req.body;
    const pet = await petService.createPet({
      name_pet,
      birthdata_pet,
      clientId: req.session.userid,
    });
    const list_pet = await petService.listPetClient(req.session.userid);
    if (pet) {
      return res.render("client/list_pet", {
        usersession: req.session.usersession,
        list_pet,
      });
    }
    return res.render("client/register_pet", {
      usersession: req.session.usersession,
    });
  },
  listPet: async (req, res) => {
    let list_pet = [];
    try {
      const raw = await Pet.findAll({
        where: {
          clientId: req.session.userid,
        },
      });
      if (raw) {
        raw.map((data) => {
          list_pet.push(data.dataValues);
        });
      }
      console.log(raw);
      return res.render("client/list_pet", {
        usersession: req.session.usersession,
        list_pet,
      });
    } catch (error) {
      console.log(error);
      return res.render("client/register_pet", {
        usersession: req.session.usersession,
      });
    }
  },
};

module.exports = petController;
