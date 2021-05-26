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
            validate: {
                isIn: [
                    ['MACHO', 'HEMBRA']
                ]
            }
        },
        birthdata: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        img_key: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        img_location: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false,
        initialAutoIncrement: 3000,
    }
);
//Pet.sync({ alter: true }).then(() => console.log('---> Sync Pet'));

//Pet.sync({ alter: true }).then(() => console.log('Goo alter pet'));
module.exports = Pet;