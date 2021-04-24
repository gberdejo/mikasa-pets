const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

const DetailTicket = sequelize.define('detailticket', {
    amount_product: {
        type: DataTypes.INTEGER,
        require: [true, "es necesario la cantidad "]
    },
    discount_product: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0
    },
    price_product: {
        type: DataTypes.DOUBLE,
        require: [true, "se necesita el precio"]
    },
    subtotal_product: {
        type: DataTypes.DOUBLE,
        require: [true, "se necesita el subtoal"]
    }
}, {
    timestamps: false
});
module.exports = DetailTicket;