const { Op } = require('sequelize');
const helper = require('../helpers');
const bcrypt = require('bcryptjs');
const Client = require('../models/client');
const sessionController = {
    loginSession: async(req, res) => {
        try {
            const { email, password } = req.body;
            const client = await Client.findOne({
                where: {
                    email_client: email
                }
            });
            if (!client) {
                return res.redirect('/login');
            }
            if (bcrypt.compareSync(password, client.password_client)) {
                const list_product = await helper.listProduct();
                //save SESSION
                req.session.usersession = client.name_client;
                req.session.userid = client.id;
                return res.render('client/home_client', {
                    usersession: client.name_client,
                    list_product
                });
            } else {
                return res.redirect('/login');
            }

        } catch (error) {
            console.log(error);
            return res.render('client/auth/login');
        }
    },
    exitSession: (req, res) => {
        console.log("se entro a destroy");
        req.session.destroy(() => {
            console.log("--> se destruyo la sesion");
        });
        return res.render('home');
    }
}
module.exports = sessionController;