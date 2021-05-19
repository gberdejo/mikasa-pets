const Pet = require("../models/pet");
const { Op } = require("sequelize");
const { uploadFile, deleteFile } = require("../aws/s3");
const { resizePet } = require("../settings/sharp");

const petService = {};

petService.createPet = async (obj) => {
  try {
    const pet = Pet.build(obj);
    const buffer = await resizePet(obj.img.path);
    const s3 = await uploadFile(buffer,obj.img.originalname);
    pet.img_key = s3.key;
    pet.img_location = s3.Location;
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
petService.deletePet = async(id,key)=>{
  try {
    const [statusDb,dataFile] = await Promise.all([
      await Pet.destroy({
        where:{
          id
        }
      }),
      await deleteFile(key)]);
    return {
      statusDb,
      dataFile
    };
  } catch (error) {
    console.log(error);
    return null
  }
}
module.exports = petService;
