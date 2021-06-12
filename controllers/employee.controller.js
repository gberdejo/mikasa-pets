const { response, request } = require("express");
const Emplo = require("../models/employee");
const Pet = require("../models/pet");
const Story = require("../models/story.service");
const sequelize = require("../database");
const { QueryTypes } = require("sequelize");
const employeeController = {};
employeeController.renderProfileEmployee = (req, res) => {
  res.render("profile_employee");
};
employeeController.renderAtenderCitas = async (req, res) => {
  try {
    const list = await sequelize.query(
      `select story.id ,pet.name as pet ,pro.name as product,pro.precio
        ,story.responsable,story.dni, story.state,story.atendido
        from storyservices story
        left join pets pet on story.petId=pet.id
        left join products pro on story.productId = pro.id where pro.employeeId = ${req.user.id}`,
      { type: QueryTypes.SELECT }
    );
    res.render("citas_atender", { citas: list });
  } catch (err) {
    res.redirect("/vet");
  }
};
employeeController.renderConsultoriaVet = async (req, res) => {
  try {
    const story = await sequelize.query(
      `select * from storyservices where id = ${req.params.id}`,
      { type: QueryTypes.SELECT }
    );

    console.log(story);

    if (story.length === 0) {
      console.log("vacio");
      req.flash("success", "Intentelo nuevamente");
      return res.redirect("/citas-atender");
    }
    const pet = await Pet.findByPk(story[0].petId);

    res.render("consultoria_vet", {
      pets: [pet.dataValues],
      storys: [story.dataValues],
    });
  } catch (err) {
    console.log(err);
    res.redirect("/citas-atender");
  }
};
module.exports = employeeController;
