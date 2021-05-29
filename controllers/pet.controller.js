const petService = require("../services/pet.service");

const petController = {};

petController.renderMyPets = async(req, res) => {
    try {
        const pets = await petService.getListPetbyClient(req.user.id);
        res.render("pet_list", { pets });
    } catch (err) {
        console.log(err);
        res.render("pet_list");
    }
};
petController.renderRegisterPet = (req, res) => res.render("pet_register");

petController.createPet = async(req, res) => {
    try {
        console.log(req.body);
        const img = req.file;
        const { name, race, sex, birthdata, type } = req.body;
        const obj = { name, race, sex, birthdata, img, type, clientId: req.user.id }

        if (!img) {
            req.flash('error', 'Hubo un problema con la imagen que elegiste');
            return res.redirect("/register-my-pets");
        }
        const pet = await petService.createPet(obj);
        if (!pet) {
            req.flash('error', 'Hubo un problema con los datos que rellenaste');
            return res.redirect("/register-my-pets");
        }

        return res.redirect('my-pets');
    } catch (err) {
        console.log(err);
        res.redirect("/register-my-pets");
    }
};
petController.deletePet = async(req, res) => {
    try {
        const { key } = req.body;
        const id = req.params.id;
        const data = await petService.deletePet(id, key);
        if (!data) return res.json({ msg: 'hubo un problema' });
        res.json({ msg: 'ok', data });
    } catch (error) {

    }
}
module.exports = petController;