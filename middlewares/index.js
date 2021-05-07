const helper = require('../helpers');
const { validationResult } = require('express-validator');
const mid = {
    existsSession: async(req, res, next) => {
        if (typeof req.session.usersession !== 'undefined') {
            try {
                const list_product = await helper.listProduct();
                return res.render('home', {
                    list_product
                });
            } catch (error) {
                return res.render('home',);
            }
        }
        next();
    },
    existsSessionModePet: (req, res, next) => {
        if (typeof req.session.usersession !== 'undefined') {
            return res.render('client/register_pet', {
                usersession: req.session.usersession
            });
        };
        next();
    },
    checkValidation: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    existsSessionModePetList: (req, res, next) => {
        if (typeof req.session.usersession !== 'undefined') {
            return res.render('client/home-client', {
                usersession: req.session.usersession,
            });
        }
        next();
    },

}
module.exports = mid;