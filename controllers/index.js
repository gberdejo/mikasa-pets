const { request, response } = require('express');

const Client = require('../models/client');

// ********* Pages ******************
const homePag = (req, res) => {
    req.session.user = {
        id: 1,
        name_client: "gabriel",
        lastname_client: "berdjeo",
        nick_client: "zeref",
        phone_client: 936865356,
        email_client: "gabriel@hotmail.com",
        password_client: "ets554"
    }
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
    console.log(req.body);
    const {
        name_client,
        lastname_client,
        nick_client,
        phone_client,
        email_client,
        password_client,
        birthdata_client,
        direction_client
    } = req.body;
    const client = await Client.create({ direction_client, name_client, lastname_client, nick_client, phone_client, email_client, password_client, birthdata_client });
    return res.json({
        client
    })
}

module.exports = {
    homePag,
    createClient,
    loginPag,
    registerPag,
    redirectionPag
}