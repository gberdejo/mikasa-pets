const { query_list_product } = require('../helpers');
const { validationResult } = require('express-validator');
const existsSession = async(req, res, next) => {
    if (typeof req.session.usersession !== 'undefined') {
        try {
            const list_product = await query_list_product;
            return res.render('home', {
                usersession: req.session.usersession,
                list_product
            });
        } catch (error) {
            return res.render('home', {
                usersession: req.session.usersession,
            });
        }
    }
    next();
}
const existsSessionModePet = (req, res, next) => {
    if (typeof req.session.usersession !== 'undefined') {
        return res.render('register_pet', {
            usersession: req.session.usersession
        });
    };
    next();
}
const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
const existsSessionModePetList = (req, res, next) => {
    if (typeof req.session.usersession !== 'undefined') {
        return res.render('list_pet', {
            usersession: req.session.usersession,
        })
    }
    next();
}
module.exports = {
    existsSession,
    existsSessionModePetList,
    checkValidation,
    existsSessionModePet
}