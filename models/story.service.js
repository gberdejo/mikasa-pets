const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const StoryService = sequelize.define("storyservice", {
    attention: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    nameservice: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    diagnosis: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    id_ticket_service: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = StoryService;