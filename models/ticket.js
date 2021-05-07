const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Ticket = sequelize.define(
  "ticket",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING,
      enum: ["PENDIENTE", "FINALIZADO"],
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    initialAutoIncrement: 20200,
  }
);

module.exports = Ticket;
