const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');
const Employee = require('./employee');
const Pet = require('./pet');

const StoryService = sequelize.define('storyservice', {
    created_storyService: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    attentio_pet: {
        type: DataTypes.DATE,
        required: [true, 'es necesario la fecha de atencion']
    },
    nameservice_pet: {
        type: DataTypes.STRING,
        required: [true, 'es necesario el nombre del servicio']
    },
    id_ticket_service: {
        type: DataTypes.INTEGER,
        required: [true, 'es necesario el id del la boleta de pago']
    }

});


module.exports = StoryService;