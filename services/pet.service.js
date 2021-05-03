const Pet = require("../models/pet");
const { Op } = require("sequelize");
const petService = {};

petService.createPet = async (body) => {
  try {
    const pet = await Pet.build(obj);
    if (pet instanceof Pet) {
      await pet.save();
      return pet;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
petService.listPet = async () => {
  let list = [];
  try {
    const raw = await Pet.findAll();
    if (raw.length >= 0) {
      raw.map((pets) => {
        list.push(pets.dataValues);
      });
      return list;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
petService.listPetClient = async (id) => {
  let list = [];
  try {
    const raw = await Pet.findAll({
      where: {
        clientId: id,
      },
    });
    if (raw.length >= 0) {
      raw.map(() => {
        list.push(raw.dataValues);
      });
      return list;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = petService;
