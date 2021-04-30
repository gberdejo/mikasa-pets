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
    login: (req, res) => res.render('login'),
    register: (req, res) => res.render('register'),
    redirectionHome: (req, res) => res.render('home'),
    registerPet: (req, res) => res.render('register_pet'),
    listPet: (req, res) => res.render('list_pet')
}

module.exports = pageController;