const { request, response } = require('express');
const Client = require('../models/client');
const { Op } = require('sequelize');
// ********* Pages ******************
const homePag = (req, res) => res.render('home');
const loginPag = (req, res) => res.render('login');
const registerPag = (req, res) => res.render('register');
const redirectionPag = (req, res) => res.render('home');
// ********* Api *******************
const createClient = async(req, res = response) => {
    const body = req.body;
    const client = await Client.create(body).catch((err) => {
        console.log(err)
        return res.render('register');
    });
    req.session.usersession = client.name_client;
    return res.render('home', {
        usersession: client.name_client
    });

};
const loginSession = async(req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
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
        return res.render('home', {
            usersession: client.name_client
        });

    } catch (error) {
        console.log(error);
        return res.render('login', {
            usersession: false
        });
    }

}
const exitSession = (req, res) => {
    req.session.usersession = false;
    return res.render('home', {
        usersession: req.session.usersession
    });
}
module.exports = {
    homePag,
    createClient,
    loginPag,
    registerPag,
    redirectionPag,
    exitSession,
    loginSession
}