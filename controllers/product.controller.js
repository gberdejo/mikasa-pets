const { request, response } = require('express');
const DetailTicket = require('../models/detail.ticket');
const Product = require('../models/product');
const detailTicketService = require('../services/detailticket.service');
const productService = require('../services/product.service');
const ticketService = require('../services/ticket.service');
const Story = require('../models/story.service');
const { Op, QueryTypes } = require('sequelize');
const fs = require('fs');
const Pet = require('../models/pet');
const Ticket = require('../models/ticket');
const Track = require('../models/track');
const sequelize = require('../database');
const moment = require('moment');
moment.locale('es');
const productController = {};

productController.renderProduct = async (req, res) => {
  try {
    const products = await productService.getlistProduct();
    res.render('product', { products });
  } catch (error) {
    res.render('product');
  }
};
productController.renderVet = async (req, res) => {
  try {
    const vets = await productService.getlistVet();
    res.render('vet', { vets });
  } catch (err) {
    console.log(err);
    res.render('vet');
  }
};
productController.renderListProduct = async (req, res) => {
  try {
    const products = await productService.getlistProduct();
    res.render('product_list', { products });
  } catch (error) {
    res.render('product_list');
  }
};
productController.renderCreateProduct = async (req, res) => {
  res.render('product_register');
};
productController.createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const category = 'PRODUCT';
    const img = req.file;
    if (!img) {
      req.flash('error', 'El formato de la imagen no esta soportado');
      return res.redirect('/create-product');
    }
    const { name, precio, stock, description_simple, description_html } =
      req.body;
    const obj = {
      name,
      precio,
      stock,
      description_simple,
      description_html,
      category,
      employeeId: req.user.id,
      img,
    };

    const product = await productService.createProduct(obj);
    if (!product) {
      req.flash(
        'error',
        'Hubo un problema a la hora de crear el producto, intentelo denuevo'
      );
      return res.redirect('/create-product');
    }
    req.flash(
      'success',
      `El producto con codigo ${product.id} y nombre "${product.name}" se a creado con exito!`
    );
    res.redirect('/create-product');
  } catch (error) {
    console.log(error);
    req.flash(
      'error',
      'Hubo un problema a la hora de crear el producto, intentelo denuevo'
    );
    return res.redirect('/create-product');
  }
};
productController.deleteProduct = async (req = request, res) => {
  try {
    console.log(req.params.id);
    const product = await productService.deleteProduct(req.params.id);
    if (!product) {
      req.flash('error', 'Hubo un error a la hora de eliminar el producto');
      return res.redirect('/list-product');
    }
    req.flash(
      'success',
      `El producto con codigo ${req.params.id} se elimino correctamente`
    );
    res.redirect('/list-product');
  } catch (err) {
    console.log(err);
    res.redirect('/list-product');
  }
};
productController.renderUpdateProduct = async (req, res) => {
  try {
    const product = await productService.getProduct(req.params.id);
    if (!product) {
      req.flash('error', 'Ocurrio un error o el producto fue eliminado');
      return res.redirect('/list-product');
    }
    console.log(product);
    res.render('product_update', { product: [product] });
  } catch (err) {
    console.log(err);
    res.redirect('/list-product');
  }
};
productController.updateProduct = async (req, res) => {
  try {
    const { name, precio, stock, description_simple, description_html } =
      req.body;
    const obj = {
      name,
      precio,
      stock,
      description_simple,
      description_html,
      id: req.params.id,
    };
    const product = await productService.updateProduct(obj);
    if (!product) return res.redirect('/update-product');
    req.flash(
      'success',
      `El producto con condigo ${req.params.id} se actualizo correctamente`
    );
    res.redirect('/list-product');
  } catch (err) {
    console.log(err);
    res.redirect('/update-product');
  }
};
productController.renderLisVet = async (req, res) => {
  try {
    const vets = await productService.getlistVet();
    res.render('vet_list', { vets });
  } catch (err) {
    console.log(err);
    res.render('vet_list');
  }
};
productController.renderCreateVet = (req, res) => res.render('vet_register');

productController.createVet = async (req, res) => {
  try {
    console.log(req.body);
    const category = 'VET';
    const img = req.file;
    if (!img) {
      req.flash('error', 'El formato de la imagen no esta soportado');
      return res.redirect('/create-vet');
    }
    const { name, precio, description_simple, description_html } = req.body;
    const obj = {
      name,
      precio,
      description_simple,
      description_html,
      category,
      employeeId: req.user.id,
      img,
    };
    const product = await productService.createVet(obj);

    if (!product) {
      req.flash(
        'error',
        'Hubo un problema a la hora de crear el servicio, intentelo denuevo'
      );
      return res.redirect('/create-vet');
    }
    req.flash(
      'success',
      `El servicio con codigo ${product.id} y nombre "${product.name}" se a creado con exito!`
    );
    res.redirect('/create-vet');
  } catch (error) {
    console.log(error);
    req.flash(
      'error',
      'Hubo un problema a la hora de crear el servicio, intentelo denuevo'
    );
    return res.redirect('/create-vet');
  }
};

productController.addProducttoCart = async (req, res) => {
  try {
    const { productId, quantity, price, subtotal, name } = req.body;
    const clientId = req.user.id;

    let ticket = await ticketService.getTicketbyStatusClientId(clientId);
    if (!ticket) {
      ticket = await ticketService.createTicket({
        status: 'PENDIENTE',
        clientId,
      });
    }

    let detail = await detailTicketService.getDetailTicketbyProductId(
      ticket.id,
      productId
    );
    if (!detail) {
      detail = await detailTicketService.createDetailTikect({
        quantity,
        price,
        subtotal,
        ticketId: ticket.id,
        productId,
        name,
      });
    } else {
      detail = await detailTicketService.updateDetailTicket({
        ticketId: ticket.id,
        productId,
        quantity: Number(detail.quantity) + Number(quantity),
        subtotal: parseFloat(detail.subtotal) + parseFloat(subtotal),
      });
    }
    if (!detail)
      return res
        .status(400)
        .json({ msg: 'Hubo un problema con los datos enviados' });

    res.status(200).json({ msg: '200 ok' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
/* Shopping Cart */
productController.renderShoppingCart = async (req, res) => {
  try {
    const clientId = req.user.id;

    const ticket = await ticketService.getTicketbyStatusClientId(clientId);
    if (!ticket) return res.redirect('/');

    const details = await detailTicketService.listDetailTicket(ticket.id);
    res.render('shopping_cart', { details });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};
productController.renderUpdateVet = async (req, res) => {
  try {
    const vet = await productService.getVetbyId(req.params.id);
    res.render('vet_update', { vet: [vet] });
  } catch (error) {
    res.redirect('/list-vet');
  }
};
productController.updateVet = async (req, res) => {
  try {
    const vet = await productService.updateVet(req.params.id, req.body);
    if (!vet) {
      req.flash('error', 'Hubo un problema a la hora actualizar');
      return res.redirect(`/update-vet/${req.params.id}`);
    }
    req.flash('success', `Servcio actualizado : codigo ${req.params.id}`);
    res.redirect('/list-vet');
  } catch (error) {
    req.flash('error', 'Hubo un problema a la hora actualizar');
    return res.redirect(`/update-vet/${req.params.id}`);
  }
};
productController.deleteVet = async (req, res) => {
  try {
    const vet = productService.deleteVet(req.params.id);
    if (!vet) {
      res.status(404).json({ msg: 'no se elimino' });
    }
    res.status(200).json({ msg: 'ok' });
  } catch (error) {
    res.status(500).json({ msg: 'no se elimino' });
  }
};
productController.deleteItemCart = async (req, res) => {
  try {
    const { ticketId, productId } = req.body;
    const detail = await DetailTicket.findOne({
      where: {
        [Op.and]: [{ ticketId }, { productId }],
      },
    });
    if (!detail) return res.status(500).json({ msg: ':v' });
    //const raw = detail.get({ plain: true });
    await DetailTicket.destroy({
      where: {
        [Op.and]: [{ ticketId }, { productId }],
      },
    });
    res.status(200).json({ msg: ':ok' });
  } catch (error) {
    res.status(500).json({ msg: ':v' });
  }
};
productController.renderPasarelaProduct = (req, res) => {
  try {
    const user = req.user;
    res.render('pasarela', { user: [user] });
  } catch (err) {
    req.flash('success', ' Intentelo en unos minutos');
    res.redirect('/cart');
  }
};
productController.renderPasarelaVet = (req, res) => {
  try {
    const { productId, petId, responsable, dni, attention } = req.body;
    const user = req.user;
    user.productId = productId;
    user.petId = petId;
    user.responsable = responsable;
    user.dni = dni;
    user.attention = attention;
    res.render('pasarela_vet', { user: [user] });
  } catch (err) {
    req.flash('success', ' Intentelo en unos minutos');
    console.log(err);
    res.redirect('/vet');
  }
};
productController.buyVet = async (req, res) => {
  try {
    const { productId, petId, responsable, dni, attention } = req.body;
    const story = Story.build({
      productId,
      petId,
      responsable,
      dni,
      attention,
      state: 'PAGADO',
    });
    await story.save();
    req.flash('success', `Pago satisfacoria - Codigo: ${story.dataValues.id}`);
    req.flash('success', ' Revice su bandeja de historial de citas');
    res.redirect('/vet');
  } catch (err) {
    req.flash('success', ' Intentelo en unos minutos');
    console.log(err);
    res.redirect('/vet');
  }
};
productController.buyProduct = async (req, res = response) => {
  try {
    const ticket = await Ticket.findOne({
      where: {
        [Op.and]: {
          clientId: req.user.id,
          status: 'PENDIENTE',
        },
      },
    });
    if (!ticket) {
      req.flash('error', 'Tienes el carrito vacio');
      return res.redirect('/cart');
    }
    const list = await DetailTicket.findAll({
      where: { ticketId: ticket.dataValues.id },
    });
    let total = 0;
    list.map((item) => {
      total += item.dataValues.subtotal;
    });
    await Ticket.update(
      {
        status: 'PAGADO',
        total,
        date: new Date(),
        track: 'ESPERA',
      },
      {
        where: {
          id: ticket.dataValues.id,
        },
      }
    );
    req.flash(
      'success',
      `Compra satisfacoria - Codigo: ${ticket.dataValues.id}`
    );
    req.flash('success', ' Revice su bandeja de historial de compras');
    res.redirect('/product');
  } catch (err) {
    req.flash('error', 'Tienes el carrito vacio');
    return res.redirect('/cart');
  }
};
productController.renderProgramarCita = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      req.flash('success', 'Hubo un problema a la hora programar su cita');
      return res.redirect('/vet');
    }
    const pet = await Pet.findAll({
      where: {
        clientId: req.user.id,
      },
    });
    if (pet.length === 0) {
      req.flash('success', 'Necesitas tener una mascota registrada');
      return res.redirect('/vet');
    }
    let pets = [];
    pet.map((i) => {
      pets.push(i.dataValues);
    });

    res.render('programar', { product: [product.dataValues], pets: pets });
  } catch (err) {
    req.flash('success', ' Intentelo en unos minutos');
    console.log(err);
    res.redirect('/vet');
  }
};
productController.renderProductSeguimiento = async (req, res) => {
  try {
    const format = 'MMMM Do YYYY, h:mm:ss a';
    const espera = await sequelize.query(
      `
        SELECT t.id as ticketId, t.* FROM tickets t
        where t.track = 'ESPERA'
    `,
      { type: QueryTypes.SELECT }
    );
    let list_espera = [];
    espera.map((item) => {
      let obj = item;
      obj.date = moment(obj.date).format(format);
      list_espera.push(obj);
      console.log(obj);
    });
    //!!!!!!
    const enviado = await sequelize.query(
      `
        SELECT t.id as ticketId, t.*,tr.* FROM tickets t inner join track tr on t.id = tr.ticketId
        where t.track = 'ENVIADO'
    `,
      { type: QueryTypes.SELECT }
    );
    let list_enviado = [];
    enviado.map((item) => {
      let obj = item;
      obj.date = moment(obj.date).format(format);
      obj.date_salida = moment(obj.date_salida).format(format);
      obj.date_llegada = moment(obj.date_llegada).format(format);
      list_enviado.push(obj);
    });
    //!!!!
    const entregado = await sequelize.query(
      `
        SELECT t.id as ticketId, t.*,tr.* FROM tickets t inner join track tr on t.id = tr.ticketId
        where t.track = 'ENTREGADO'
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
    res.render('product_seguimiento', {
      espera: list_espera,
      enviado: list_enviado,
      entregado: list_entregado,
    });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};
productController.enviarProduct = async (req, res) => {
  try {
    await Ticket.update(
      {
        track: 'ENVIADO',
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    const hora = moment();
    const track = await Track.create({
      clientId: req.query.clientId,
      ticketId: req.params.id,
      date_llegada: hora.add('hour', 5),
    });
    req.flash(
      'success',
      `Se envio el Pedido - Codigo Track ${track.ticketId} `
    );
    res.redirect('/product-seguimiento');
  } catch (error) {
    req.flash('success', 'Intentelo denuevo');
    res.redirect('/product-seguimiento');
  }
};
module.exports = productController;
