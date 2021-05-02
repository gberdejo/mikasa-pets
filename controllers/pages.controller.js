const helper = require('../helpers');
const pageController = {
    home: async(req, res) => {
        try {
            const list_product = await helper.listProduct;
            return res.render('home', {
                list_product
            })
        } catch (error) {
            console.log(error);
            return res.render('home');
        }
    },
    login: (req, res) => res.render('client/auth/login'),
    register: (req, res) => res.render('client/auth/register'),
    redirectionHome: (req, res) => res.render('home'),
    registerPet: (req, res) => res.render('client/register_pet'),
    listPet: (req, res) => res.render('client/list_pet')
}

module.exports = pageController;