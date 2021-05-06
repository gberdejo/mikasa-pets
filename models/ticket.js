const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");
const DetailTicket = require("./detail.ticket");
const Product = require("./product");

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
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    initialAutoIncrement: 20200,
  }
);

module.exports = Ticket;
