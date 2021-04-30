const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { Op } = require('sequelize');
const Client = require('../models/client');
const clientController = {
    createUser: async(req, res = response) => {
        try {
            const { name_client, lastname_client, birthdata_client, direction_client, nick_client, phone_client, email_client, password_client } = req.body;
            const client = Client.build({ name_client, lastname_client, birthdata_client, direction_client, nick_client, phone_client, email_client, password_client });
            const clientExists = await Client.findOne({
                where: { email_client }
            });
            console.log(clientExists);
            if (clientExists) {
                return res.redirect('/');
            }
            const salt = bcryptjs.genSaltSync(10);
            client.password_client = bcryptjs.hashSync(password_client, salt);
            await client.save();
            console.log({
                msg: "New User",
                client
            })
            return res.render('home', {
                usersession: client.name_client
            });

        } catch (error) {

            console.log(error)
            return res.redirect('/')
        }

    }
}
module.exports = clientController;