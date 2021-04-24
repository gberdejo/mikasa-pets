const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

const Pet = sequelize.define('pet', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name_pet: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    birthdata_pet: {
        type: DataTypes.DATE,
        allowNull: true
    },
    created_pet: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }

}, {
    timestamps: false
});
module.exports = Pet;