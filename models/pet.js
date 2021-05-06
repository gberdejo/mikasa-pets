const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");
const Employee = require("./employee");
const StoryService = require("./story.service");

const Pet = sequelize.define(
  "pet",
  {
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
    race: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING(20),
      enum: ["MACHO", "HEMBRA"],
    },
    birthdata: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    initialAutoIncrement: 3000,
  }
);

module.exports = Pet;
