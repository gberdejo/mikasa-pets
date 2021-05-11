const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Pet = sequelize.define(
    "pet", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        race: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        sex: {
            type: DataTypes.STRING(20),
            enum: ["MACHO", "HEMBRA"],
        },
        birthdata: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING(400),
            allowNull: false,
        },
        Date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false,
        initialAutoIncrement: 3000,
    }
);

module.exports = Pet;