const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = require('../database');
const Client = sequelize.define("client", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name_client: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    lastname_client: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    birthdata_client: {
        type: DataTypes.DATE,
        allowNull: true
    },
    direction_client: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    nick_client: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    phone_client: {
        type: DataTypes.INTEGER(9),
        allowNull: true
    },
    email_client: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    password_client: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    created_client: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,

});
(async() => {
    await sequelize.sync({ force: true });
    console.log("TABLA CLIENT SINCRONIZADA");
})();

module.exports = Client;