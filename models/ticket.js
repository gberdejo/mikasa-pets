const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');
const DetailTicket = require('./detail.ticket');
const Product = require('./product');

const Ticket = sequelize.define('ticket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    status_ticket: {
        type: DataTypes.STRING,
        required: [true, 'El status es requerido'],
        emun: ['PENDIENTE', 'FINALIZADO'],
    },
    created_ticket: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});
Ticket.belongsToMany(Product, { through: DetailTicket, uniqueKey: false });
DetailTicket.belongsTo(Ticket);
DetailTicket.belongsTo(Product);
module.exports = Ticket;