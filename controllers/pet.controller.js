const Pet = require('../models/pet');
const petController = {
    createPet: async(req, res) => {
        const { name_pet, birthdata_pet } = req.body;
        try {
            const pet = await Pet.create({
                name_pet,
                birthdata_pet,
                clientId: req.session.userid
            });
            return res.json({ pet });
        } catch (error) {
            console.log(error);
            return res.json({ msg: "algo fallo" });
        }
    }
};



module.exports = petController;