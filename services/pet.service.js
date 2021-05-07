const Pet = require("../models/pet");
const { Op } = require("sequelize");
const petService = {};

petService.createPet = async (obj) => {
  try {
    const pet = await Pet.build(obj);
    if (pet instanceof Pet) {
      await pet.save();
      return pet.dataValues;
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
petService.getListPetbyClient = async (id) => {
  let list = [];
  try {
    const raw = await Pet.findAll({
      where: {
        clientId: id,
      },
    });
    if (raw.length >= 0) {
      raw.map((pets) => {
        list.push(pets.dataValues);
      });
      return list;
    }
    return list;
  } catch (error) {
    console.log(error);
    return list;
  }
};
module.exports = petService;
