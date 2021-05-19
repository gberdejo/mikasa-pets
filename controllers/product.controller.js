const { request } = require('express');
const Product = require('../models/product');
const detailTicketService = require('../services/detailticket.service');
const productService = require("../services/product.service");
const ticketService = require('../services/ticket.service');
const productController = {};

productController.renderProduct = async(req, res) => {
    const products = await productService.getlistProduct();
    res.render('product', { products });
}
productController.renderVet = async(req, res) => {
    const vets = await productService.getlistVet();
    res.render('vet', { vets });
}
productController.renderListProduct = async(req, res) => {
    const products = await productService.getlistProduct();
    res.render("product_list", { products });
};
productController.renderCreateProduct = async(req, res) => {
    res.render("product_register");
};
productController.createProduct = async(req, res) => {
    console.log(req.body);
    const category = "PRODUCT";
    const img = req.file;
    if (!img) {
        req.flash('error', 'El formato de la imagen no esta soportado');
        return res.redirect("/create-product");
    }
    const { name, precio, stock, description_simple, description_html } = req.body;
    const obj = {
        name,
        precio,
        stock,
        description_simple,
        description_html,
        category,
        employeeId: req.user.id,
        img
    };

    const product = await productService.createProductandVet(obj);
    if (!product) {
        req.flash('error', 'Hubo un problema a la hora de crear el producto, intentelo denuevo');
        return res.redirect("/create-product");
    }
    req.flash("success", `El producto con codigo ${product.id} y nombre "${product.name}" se a creado con exito!`);
    res.redirect("/create-product");
};
productController.deleteProduct = async(req = request, res) => {
    console.log(req.params.id);
    const product = await productService.deleteProduct(req.params.id);
    if (!product) {
        req.flash('error', 'Hubo un error a la hora de eliminar el producto');
        return res.redirect('/list-product');
    }
    req.flash('success', `El producto con codigo ${req.params.id} se elimino correctamente`);
    res.redirect('/list-product');

}
productController.renderUpdateProduct = async(req, res) => {
    const product = await productService.getProduct(req.params.id);
    if (!product) {
        req.flash('error', 'Ocurrio un error o el producto fue eliminado');
        return res.redirect('/list-product');
    }
    console.log(product);
    res.render('product_update', { product: [product] });
}
productController.updateProduct = async(req, res) => {
    const { name, precio, stock, description_simple, description_html } = req.body;
    const obj = { name, precio, stock, description_simple, description_html, id: req.params.id };
    const product = await productService.updateProduct(obj);
    if (!product) return res.redirect(`/update-product/${req.params.id}`);
    req.flash('success', `El producto con condigo ${req.params.id} se actualizo correctamente`);
    res.redirect('/list-product');
}
productController.renderLisVet = async(req, res) => {
    const vets = await productService.getlistVet();
    res.render('vet_list', { vets });
}
productController.renderCreateVet = (req, res) => res.render('vet_register');
productController.createVet = async(req, res) => {
    console.log(req.body);
    const category = "VET";
    const { name, precio, description_simple, description_html } = req.body;
    const obj = { name, precio, description_simple, description_html, category, employeeId: req.user.id };
    const product = await productService.createProductandVet(obj);
    if (!product) {
        req.flash('error', 'Hubo un problema a la hora de crear el servicio, intentelo denuevo');
        return res.redirect("/create-vet");
    }
    req.flash("success", `El producto con codigo ${product.id} y nombre "${product.name}" se a creado con exito!`);
    res.redirect("/create-vet");
};

productController.addProducttoCart = async(req, res) => {
        if (!req.user) return res.status(401).json({ msg: 'Necesita autenticarse' });

        console.log(req.body);
        const { productId, quantity, price, subtotal } = req.body;
        const clientId = req.user.id;

        let ticket = await ticketService.getTicketbyStatusClientId(clientId);
        if (!ticket) {
            ticket = await ticketService.createTicket({ status: 'PENDIENTE', clientId });
        }

        let detail = await detailTicketService.getDetailTicketbyProductId(ticket.id, productId);
        if (!detail) {
            detail = await detailTicketService.createDetailTikect({ quantity, price, subtotal, ticketId: ticket.id, productId });
        } else {
            detail = await detailTicketService
                .updateDetailTicket({
                    ticketId: ticket.id,
                    productId,
                    quantity: Number(detail.quantity) + Number(quantity),
                    subtotal: parseFloat(detail.subtotal) + parseFloat(subtotal)
                });
        }
        console.log(detail);
        if (!detail) return res.status(400).json({ msg: 'Hubo un problema con los datos enviados' })

        res.status(200).json({ msg: "200 ok" });
    }
    /* Shopping Cart */
productController.renderShoppingCart = async(req, res) => {
    //const ticket = await ticketService.getTicketbyClientId(req.user.id);
    res.render('shopping_cart');
}
module.exports = productController;