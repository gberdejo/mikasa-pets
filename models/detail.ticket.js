const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const DetailTicket = sequelize.define("detailticket", {
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    discount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    subtotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
});

module.exports = DetailTicket;