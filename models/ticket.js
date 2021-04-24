const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');
const DetailTicket = require('./detail.ticket');

const Ticket = sequelize.define('ticket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    status_ticket: {
        type: DataTypes.STRING,
        require: [true, 'El status es requerido'],
        emun: ['PENDIENTE', 'FINALIZADO'],
    },
    created_ticket: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});
Ticket.hasMany(DetailTicket);

module.exports = Ticket;