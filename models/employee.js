const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Employee = sequelize.define(
  "employee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_key:{
      type : DataTypes.STRING(250),
      defaultValue: ''
    },
    img_location:{
      type : DataTypes.STRING(250),
      defaultValue : 'https://image.flaticon.com/icons/png/512/572/572711.png'
    },
    role: {
      type: DataTypes.STRING(20),
      validate:{
        isIn:[['VENDEDOR','VETERINARIO']]
      }
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    initialAutoIncrement: 2000,
  }
);

module.exports = Employee;
