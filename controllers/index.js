const { request, response } = require('express');
const Client = require('../models/client');
const { Op } = require('sequelize');
const Product = require('../models/product');
const Pet = require('../models/pet');
const { query_list_product } = require('../helpers');
// ********* Pages ******************
const homePag = async(req, res) => {
    try {
        const list_product = await query_list_product;
        return res.render('home', {
            list_product
        })
    } catch (error) {
        console.log(error);
        return res.render('home');
    }
};
const loginPag = (req, res) => res.render('login');
const registerPag = (req, res) => res.render('register');
const redirectionPag = (req, res) => res.render('home');
const registerPetPag = (req, res) => res.render('register_pet');
const listPetPag = (req, res) => res.render('list_pet');
// ********* Api *******************
const createClient = async(req, res = response) => {
    try {
        const body = req.body;
        const client = await Client.create(body);
        req.session.usersession = client.name_client;
        return res.render('home', {
            usersession: client.name_client
        });

    } catch (error) {
        console.log(error)
        return res.render('register');
    }

};
const loginSession = async(req, res) => {

    console.log(req.body);
    try {
        const { email, password } = req.body;
        const list = email.split("@");
        if (list[1] === global.DOMAIN) {

        } else {
            const data = await Client.findAll({
                where: {
                    [Op.and]: [
                        { email_client: email },
                        { password_client: password }
                    ]
                }
            });
            const client = data[0].dataValues;
            req.session.usersession = client.name_client;
            req.session.userid = client.id;
            console.log(client.id);
            console.log(req.session.userid);
            const list_product = await query_list_product;
            return res.render('home', {
                usersession: client.name_client,
                list_product
            });
        }
    } catch (error) {
        console.log(error);
        return res.render('login');
    }

}
const exitSession = (req, res) => {
    console.log("se entro a destroy");
    req.session.destroy(() => {
        console.log("--> se destruyo la sesion");
    });
    return res.render('home');
}
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