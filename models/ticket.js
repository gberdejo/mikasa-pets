const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Ticket = sequelize.define(
    "ticket", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.STRING,
            validate:{
                isIn:[['PENDIENTE','PAGADO']]
            }
        },
        total: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.0
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false,
        initialAutoIncrement: 20200,
    }
);

module.exports = Ticket;