const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Track = sequelize.define(
  'track',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
    },
    ticketId: {
      type: DataTypes.INTEGER,
    },
    date_salida: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    date_llegada: {
      type: DataTypes.DATE,
    },
    empresa: {
      type: DataTypes.STRING,
      defaultValue: 'Olva Courier S.A.C',
    },
  },
  {
    tableName: 'track',
    timestamps: false,
    initialAutoIncrement: 20200,
  }
);

module.exports = Track;
