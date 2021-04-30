const Client = require('../models/client');
const clientController = {
    createUser: async(req, res = response) => {
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

    }
}
module.exports = clientController;