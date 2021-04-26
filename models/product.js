const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');
const Employee = require('./employee');

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: null,
        autoIncrement: true
    },
    name_product: {
        type: DataTypes.STRING(50),
        required: [true, "el nombre del producto es necesario"],
    },
    precio_product: {
        type: DataTypes.DOUBLE,
        required: [true, '']
    },
    stock_product: {
        type: DataTypes.INTEGER,
        required: [true, 'es necesario el stock']
    },
    description_simple_product: {
        type: DataTypes.STRING,
        required: [true, 'es nesesario la descripcion simple']
    },
    description_html_product: {
        type: DataTypes.STRING,
        required: [true, 'es necesario la descripcion en html']
    },
    img1_product: {
        type: DataTypes.STRING,
    },
    img2_product: {
        type: DataTypes.STRING,
    },
    img3_product: {
        type: DataTypes.STRING,
    },
    created_product: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});


module.exports = Product;