const helper = require('../helpers');
const pageController = {
    homeClient: async(req, res) => {
        try {
            const list_product = await helper.listProduct();
            return res.render('client/home_client', {
                usersession: req.session.usersession,
                list_product
            })
        } catch (error) {
            console.log(error);
            return res.render('client/home_client',{
                usersession: req.session.usersession,
            });
        }
    },
    home: async(req, res) => {
        try {
            const list_product = await helper.listProduct();
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
    listPet: (req, res) => res.render('client/list_pet'),
    registerProduct:(req,res) => res.render('admin/register_product'),
    listProduct:(req,res)=>res.render('admin/list_product')
}

module.exports = pageController;