const petService = require("../services/pet.service");

const petController = {};

petController.renderMyPets = async(req, res) => {
    const pets = await petService.getListPetbyClient(req.user.id);
    res.render("pet_list", { pets });
};
petController.renderRegisterPet = (req, res) => res.render("pet_register");

petController.createPet = async(req, res) => {
    console.log(req.body);
    const img = req.file;
    const { name, race, sex, birthdata,type } = req.body;
    const obj = {name, race, sex, birthdata,img,type,clientId:req.user.id}

    if(!img){
        req.flash('error','Hubo un problema con la imagen que elegiste');
        return res.redirect("/register-my-pets");
    }
    const pet = await petService.createPet(obj);
    if (!pet){
        req.flash('error','Hubo un problema con los datos que rellenaste');
        return res.redirect("/register-my-pets");
    }
    console.log(pet);
    return res.redirect('my-pets');
};
petController.deletePet = async (req,res) => {
    const {key} = req.body;
    const id = req.params.id;
    console.log(key);
    console.log(id);
    const data = await petService.deletePet(id,key);
    if(!data) return res.json({msg:'hubo un problema'});
    res.json({msg:'ok',data});
}
module.exports = petController;