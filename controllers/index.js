const { request, response } = require('express');
const Product = require('../models/product');
const Pet = require('../models/pet');
const Helper = require('../helpers');
const helper = new Helper();


// ********* Pages ******************// ********* Api *******************
const
const
const createPet = async(req, res) => {
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
module.exports = {
    homePag,
    listPetPag,
    createClient,
    loginPag,
    registerPag,
    redirectionPag,
    exitSession,
    loginSession,
    registerPetPag,
    createPet
}