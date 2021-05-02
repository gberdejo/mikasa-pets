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
    homeAdmin: async(req, res) => {
        try {
            const list_product = await helper.listProduct();
            return res.render('admin/home_admin', {
                list_product
            })
        } catch (error) {
            console.log(error);
            return res.render('admin/home_admin');
        }
    },
    home: async(req, res) => {
        try {
            const list_product = await helper.listProduct();
            return res.render('admin/home_admin', {
                list_product
            })
        } catch (error) {
            console.log(error);
            return res.render('admin/home_admin');
        }
    },
    login: (req, res) => res.render('client/auth/login'),
    register: (req, res) => res.render('client/auth/register'),
    redirectionHome: (req, res) => res.render('home'),
    registerPet: (req, res) => res.render('client/register_pet'),
    listPet: (req, res) => res.render('client/list_pet'),//page list
    registerProduct:(req,res) => res.render('admin/register_product'),//form
    listProduct: async(req,res)=>{// tablas detalles de producto
            try {
                const list_product = await helper.listProduct();
                return res.render('admin/list_product',{
                    list_product
                });
            } catch (error) {
                console.log(error);
                res.render('admin/home_admin');
            }
    }
    
}

module.exports = pageController;