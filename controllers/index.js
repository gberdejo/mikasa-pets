const { request, response } = require('express');

const Client = require('../models/client');

// ********* Pages ******************
const homePag = (req, res) => {
    return res.render('home', {
        name: 'gabriel'
    });
}
const loginPag = (req = request, res = response) => {
    console.log(req.session.user);
    res.render('login');
}
const registerPag = (req = request, res = response) => {

    console.log(req.session.user);
    return res.render('register');
}
const redirectionPag = (req, res) => {
        return res.render('home');
    }
    // ********* Api *******************
const createClient = async(req, res = response) => {
    const body = req.body;
    const client = await Client.create(body).catch((err) => {
        console.log(err)
        return res.render('register');
    });
    req.session.usersession = client;
    return res.render('home', {
        usersession: client.name_client
    });

};

module.exports = {
    homePag,
    createClient,
    loginPag,
    registerPag,
    redirectionPag
}