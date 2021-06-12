const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const StoryService = sequelize.define("storyservice", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    attention: {
        type: DataTypes.DATE,

    },
    atendido: {
        type: DataTypes.STRING,
        defaultValue: 'PROGRAMADA'
    },
    motivo: {
        type: DataTypes.STRING
    },
    tratamiento: {
        type: DataTypes.STRING
    },
    petId: {
        type: DataTypes.INTEGER
    },
    productId: {
        type: DataTypes.INTEGER,

    },
    state: {
        type: DataTypes.STRING,
        defaultValue: 'PENDIENTE'

    },
    responsable: {
        type: DataTypes.STRING
    },
    dni: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
});

module.exports = StoryService;