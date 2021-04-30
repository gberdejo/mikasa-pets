const { Op } = require('sequelize');
const Product = require('../models/product');
const helper = {
    listProduct: async() => {
        let list = [];
        try {
            const raw = await Product.findAll({
                order: [
                    ['name_product', 'ASC']
                ]
            });
            raw.map((pro) => {
                list.push(pro.dataValues);
            });
            return list;

        } catch (error) {
            return [];
        }
    }

}

module.exports = helper;