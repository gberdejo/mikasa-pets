const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Product = sequelize.define(
    "product", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        precio: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        description_simple: {
            type: DataTypes.STRING,
            defaultValue: "Descripción simple"
        },
        description_html: {
            type: DataTypes.STRING,
            allowNull: true
        },
        img_key: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        img_location: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        status:{
            type : DataTypes.INTEGER(1),
            defaultValue: 1
        },
        category:{
            type: DataTypes.STRING(15),
            validate:{
                isIn:[['PRODUCT','VET']]
            }
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false,
        initialAutoIncrement: 101000,
    }
);

module.exports = Product;