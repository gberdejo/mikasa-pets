const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");
const DetailTicket = require("./detail.ticket");
const Employee = require("./employee");
const Pet = require("./pet");
const Product = require("./product");
const StoryService = require("./story.service");
const Ticket = require("./ticket");
const Client = sequelize.define(
  "client",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    birthdata: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    direction: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nick: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER(9),
      allowNull: false,
      unique:true
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
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
      defaultValue : 'https://image.flaticon.com/icons/png/512/147/147144.png'
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    role: {
      type: DataTypes.STRING(15),
      defaultValue: "CLIENTE",
    },
  },
  {
    timestamps: false,
    initialAutoIncrement: 1000,
  }
);
//CLIENT <----< PET
Client.hasMany(Pet), Pet.belongsTo(Client);
//CLIENT <----< TICKET
Client.hasMany(Ticket);
Ticket.belongsTo(Client);
// Pet <----< StoryService >----> Employee
Pet.belongsToMany(Employee, { through: StoryService, uniqueKey: false });
//Employee <----< Product
Employee.hasMany(Product);
Product.belongsTo(Employee);
// TICKET <----< DETAILTICKET >----> PRODUCT
Ticket.belongsToMany(Product, { through: DetailTicket, uniqueKey: false });

(async () => {
  await sequelize
    .sync({ force: false })
    .then(() => console.log("--->>> Tablas Sincronizadas"))
    .catch((err) => {
      console.log("--->>> Tablas NO! Sincronizadas");
      console.log(err);
    });
})();

module.exports = Client;
