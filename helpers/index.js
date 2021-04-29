const { raw } = require('express');
const { Op } = require('sequelize');
const Client = require('../models/client');
const Product = require('../models/product');

const isEmailValid = async(email = '') => {
    const data = await Client.findAll({
        where: {
            [Op.eq]: {
                email_client: email
            }
        }
    });
    console.log(data);
    if (!data) {
        throw new Error(`el email ${email} no esta registrado`);
    }
}
const query_list_product = new Promise(async(resolve, reject) => {
    try {
        const raw_product = await Product.findAll({
            order: [
                ['name_product', 'ASC']
            ]
        });
        let list = [];
        raw_product.map((pro) => {
            list.push(pro.dataValues);
        });
        resolve(list);
    } catch (error) {
        reject(error);
    }
});
module.exports = {
    isEmailValid,
    query_list_product
}