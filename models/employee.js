const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");
const Product = require("./product");

const Employee = sequelize.define(
  "employee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name_employee: {
      type: DataTypes.STRING(100),
      required: [true, "es necesario el nombre del empleado"],
    },
    lastname_employee: {
      type: DataTypes.STRING(100),
      required: [true, "es necesario el apellido del empleado"],
    },
    phone_employee: {
      type: DataTypes.INTEGER,
      required: [true, "es necesario el numero de celular"],
    },
    email_employee: {
      type: DataTypes.STRING(50),
      required: [true, "es necesario el emial del empleado"],
    },
    password_employee: {
      type: DataTypes.STRING,
      required: [true, "es necesario la contraseña"],
    },
    role_employee: {
      type: DataTypes.STRING(20),
      required: [true, "es necesario seleccionar un rol"],
      emun: ["VETERINARIO", "VENDEDOR"],
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Employee;
