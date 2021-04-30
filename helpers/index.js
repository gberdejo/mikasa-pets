const { Op } = require('sequelize');
const Product = require('../models/product');
const helper = {
    listProduct: new Promise(async(resolve, reject) => {
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
    })
}

module.exports = helper;