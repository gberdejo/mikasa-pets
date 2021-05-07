const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const DetailTicket = sequelize.define("detailticket", {
    amount: {
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
}, {
    timestamps: false,
});

module.exports = DetailTicket;