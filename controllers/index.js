const { request, response } = require('express');

const Client = require('../models/client');

// ********* Pages ******************
const homePag = (req, res) => {
    console.log(typeof req.session.usersession === "undefined");
    if (typeof req.session.usersession !== "undefined") {
        return res.render('home', {
            usersession: req.session.usersession
        });
    }

    return res.render('home', {
        usersession: false
    });
}
const loginPag = (req = request, res = response) => {
    console.log(req.session.usersession);
    res.render('login');
}
const registerPag = (req = request, res = response) => {

    console.log(req.session.user);
    return res.render('register');
}
const redirectionPag = (req, res) => {
        if (typeof req.session.usersession !== "undefined") {
            return res.render('home', {
                name: req.session.usersession
            });
        }
        return res.render('home', {
            usersession: false
        });
    }
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
const loginSession = (req, res) => {
    console.log(req.body);
    const { email_user, password_user } = req.body;
    const email = 'admin@hotmail.com';
    const password = '123456';
    if (email === email_user) {
        req.session.usersession = 'Fabrizio';
        return res.render('home', { usersession: req.session.usersession });
    }
    return res.render('home', {
        usersession: false
    })

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