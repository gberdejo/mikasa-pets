const { Op } = require('sequelize');
const helper = require('../helpers');

const Client = require('../models/client');
const sessionController = {
    loginSession: async(req, res) => {
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

                const list_product = await helper.listProduct;

                return res.render('home', {
                    usersession: client.name_client,
                    list_product
                });
            }
        } catch (error) {
            console.log(error);
            return res.render('login');
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