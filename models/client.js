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
    name_client: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastname_client: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    birthdata_client: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    direction_client: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    nick_client: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    phone_client: {
      type: DataTypes.INTEGER(9),
      allowNull: true,
    },
    email_client: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    password_client: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_client: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
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

/*(async () => {
  await sequelize
    .sync({ force: false })
    .then(() => console.log("--->>> Tablas Sincronizadas"))
    .catch((err) => {
      console.log("--->>> Tablas NO! Sincronizadas");
      console.log(err);
    });
})();*/

module.exports = Client;
