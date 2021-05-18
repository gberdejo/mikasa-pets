const petService = require("../services/pet.service");

const petController = {};

petController.renderMyPets = async(req, res) => {
    const pets = await petService.getListPetbyClient(req.user.id);
    res.render("pet_list", { pets });
};
petController.renderRegisterPet = (req, res) => res.render("pet_register");

petController.createPet = async(req, res) => {
    console.log(req.body);
    const { name, race, sex, birthdata } = req.body;
    
    const pet = await petService.createPet(
        {name,race,sex,birthdata,img: "img",type: "perro",
        clientId: req.user.id,
        });

    console.log(pet);
    if (pet) return res.redirect('my-pets');

    return res.redirect("/register-my-pets");
};

module.exports = petController;