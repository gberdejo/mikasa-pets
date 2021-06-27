const { response } = require('express');
const clientService = require('../services/client.service');
const productService = require('../services/product.service');
const Ticket = require('../models/ticket');
const { Op } = require('sequelize');
const sequelize = require('../database');
const { QueryTypes } = require('sequelize');
const Pet = require('../models/pet');
const Product = require('../models/product');
const Employee = require('../models/employee');
const moment = require('moment');
moment.locale('es');
const clientController = {};
const format = 'MMMM Do YYYY, h:mm:ss a';
clientController.renderProfileClient = (req, res) =>
  res.render('profile_client');
clientController.renderMisCompras = async (req, res) => {
  try {
    //!! ESPERA
    const espera = await sequelize.query(
      `
      SELECT ti.id as ticketId , ti.* FROM tickets ti inner join clients cli 
      on ti.clientId = cli.id 
      where cli.id = ${req.user.id} and ti.track = 'ESPERA'
    `,
      { type: QueryTypes.SELECT }
    );
    let list_espera = [];
    espera.map((item) => {
      let obj = item;
      obj.date = moment(obj.date).format(format);
      list_espera.push(obj);
    });
    //!! ENVIADO
    const enviado = await sequelize.query(
      `
      SELECT ti.id as ticketId , ti.*,tra.* FROM tickets ti inner join clients cli 
      on ti.clientId = cli.id inner join track tra
      on ti.id = tra.ticketId
      where cli.id = ${req.user.id} and ti.track = 'ENVIADO'
    `,
      { type: QueryTypes.SELECT }
    );
    let list_enviado = [];
    enviado.map((item) => {
      let obj = item;
      obj.date = moment(obj.date).format(format);
      obj.date_salida = moment(obj.date_salida).format(format);
      obj.date_llegada = moment(obj.date_llegada).format(format);
      obj.url = `/product-recibido/${obj.ticketId}`;
      obj.color = 'success';
      obj.text = 'Recibir producto';
      list_enviado.push(obj);
    });
    //!!! ENTREGADO
    const entregado = await sequelize.query(
      `
      SELECT ti.id as ticketId , ti.*,tra.* FROM tickets ti inner join clients cli 
      on ti.clientId = cli.id inner join track tra
      on ti.id = tra.ticketId
      where cli.id = ${req.user.id} and ti.track = 'ENTREGADO'
    `,
      { type: QueryTypes.SELECT }
    );
    let list_entregado = [];
    entregado.map((item) => {
      let obj = item;
      obj.date = moment(obj.date).format(format);
      obj.date_salida = moment(obj.date_salida).format(format);
      obj.date_llegada = moment(obj.date_llegada).format(format);
      list_entregado.push(obj);
    });

    res.render('miscompras', { list_espera, list_enviado, list_entregado });
  } catch (err) {
    res.redirect('/product');
  }
};

clientController.productoRecibido = async (req, res) => {
  try {
    await Ticket.update(
      {
        track: 'ENTREGADO',
        date_llegada: new Date(),
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    req.flash(
      'success',
      'Se te entrego el paquete de tu compra - codigo ' + req.params.id
    );
    res.redirect('/miscompras');
  } catch (err) {
    res.redirect('/miscompras');
  }
};
clientController.renderMisCitas = async (req, res) => {
  try {
    const list = await sequelize.query(
      `
        select story.id ,pet.name as pet ,pro.name as product,pro.precio
        ,story.responsable,story.dni, story.state,story.atendido
        from storyservices story
        left join pets pet on story.petId=pet.id
        left join products pro on story.productId = pro.id where pet.clientId =  ${req.user.id}
        `,
      { type: QueryTypes.SELECT }
    );
    // res.status(200).json(list);
    res.render('miscitas', { citas: list });
  } catch (err) {
    res.redirect('/vet');
  }
};
clientController.renderMisCitasSeguimiento = async (req, res) => {
  try {
    try {
      const story = await sequelize.query(
        `select * from storyservices s where s.id = ${req.params.id} `,
        { type: QueryTypes.SELECT }
      );

      if (story.length === 0) {
        req.flash('success', 'SU CITA TODAVIA ESTA PROGRAMADA');
        return res.redirect('/miscitas');
      }
      const pet = await Pet.findByPk(story[0].petId);
      const vet = await Product.findByPk(story[0].productId);
      const employee = await Employee.findByPk(vet.dataValues.employeeId);

      res.render('consultoria_vet_detalle_cliente', {
        pets: [pet.dataValues],
        vets: [vet.dataValues],
        employees: [employee.dataValues],
        story,
      });
    } catch (err) {
      res.redirect('/miscitas');
    }
  } catch (err) {}
};
module.exports = clientController;
