const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const StoryService = sequelize.define("storyservice", {
  created: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  attentio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  nameservice: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_ticket_service: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = StoryService;
