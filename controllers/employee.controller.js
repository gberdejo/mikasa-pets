const { response, request } = require('express');
const Emplo = require('../models/employee');
const Pet = require('../models/pet');
const Story = require('../models/story.service');
const sequelize = require('../database');
const { QueryTypes } = require('sequelize');
const employeeController = {};
employeeController.renderProfileEmployee = (req, res) => {
  res.render('profile_employee');
};
employeeController.renderAtenderCitas = async (req, res) => {
  try {
    const list = await sequelize.query(
      `select story.id ,pet.name as pet ,pro.name as product,pro.precio
        ,story.responsable,story.dni, story.state,story.atendido
        from storyservices story
        left join pets pet on story.petId=pet.id
        left join products pro on story.productId = pro.id where pro.employeeId = ${req.user.id}
        and story.atendido = 'PROGRAMADA'`,
      { type: QueryTypes.SELECT }
    );
    const atendida = await sequelize.query(
      `select story.id ,pet.name as pet ,pro.name as product,pro.precio
        ,story.responsable,story.dni, story.state,story.atendido
        from storyservices story
        left join pets pet on story.petId=pet.id
        left join products pro on story.productId = pro.id where pro.employeeId = ${req.user.id}
        and story.atendido = 'ATENDIDO'`,
      { type: QueryTypes.SELECT }
    );
    res.render('citas_atender', { citas: list, atendidas: atendida });
  } catch (err) {
    res.redirect('/vet');
  }
};
employeeController.renderConsultoriaVet = async (req, res) => {
  try {
    const story = await sequelize.query(
      `select * from storyservices s where id = ${req.params.id}`,
      { type: QueryTypes.SELECT }
    );

    if (story.length === 0) {
      req.flash('success', 'Intentelo nuevamente');
      return res.redirect('/citas-atender');
    }
    const pet = await Pet.findByPk(story[0].petId);

    res.render('consultoria_vet', {
      pets: [pet.dataValues],
      story,
    });
  } catch (err) {
    res.redirect('/citas-atender');
  }
};
employeeController.renderConsultoriaVetDetalle = async (req, res) => {
  try {
    const story = await sequelize.query(
      `select * from storyservices s where id = ${req.params.id}`,
      { type: QueryTypes.SELECT }
    );

    if (story.length === 0) {
      req.flash('success', 'Intentelo nuevamente');
      return res.redirect('/citas-atender');
    }
    const pet = await Pet.findByPk(story[0].petId);

    res.render('consultoria_vet_detalle', {
      pets: [pet.dataValues],
      story,
    });
  } catch (err) {
    res.redirect('/citas-atender');
  }
};
employeeController.registrarHistorial = async (req, res) => {
  try {
    const { id, motivo, tratamiento } = req.body;

    await Story.update(
      {
        motivo,
        tratamiento,
        atendido: 'ATENDIDO',
      },
      {
        where: {
          id,
        },
      }
    );
    req.flash(
      'success',
      `El historial  con codigo ${id} se registro satisfactoriamente`
    );
    res.redirect('/citas-atender');
  } catch (err) {
    req.flash(
      'error',
      'No se pudo registrar el historial, intentelo otra vez.'
    );
    res.redirect('/citas-atender');
  }
};
module.exports = employeeController;
