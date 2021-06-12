const { response } = require("express");
const clientService = require("../services/client.service");
const productService = require("../services/product.service");
const Ticket = require("../models/ticket");
const { Op } = require("sequelize");
const sequelize = require("../database");
const { QueryTypes } = require("sequelize");
const clientController = {};

clientController.renderProfileClient = (req, res) =>
  res.render("profile_client");
clientController.renderMisCompras = async (req, res) => {
  try {
    const raw = await Ticket.findAll({
      where: {
        [Op.and]: {
          clientId: req.user.id,
          status: "PAGADO",
        },
      },
    });
    let list = [];
    raw.map((i) => {
      list.push(i.dataValues);
    });

    console.log(list);
    res.render("miscompras", { list });
  } catch (err) {
    console.log(err);
    res.redirect("/product");
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
    res.render("miscitas", { citas: list });
  } catch (err) {
    res.redirect("/vet");
  }
};
module.exports = clientController;
