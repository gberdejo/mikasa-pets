const { request } = require('express');
const Product = require('../models/product');
const detailTicketService = require('../services/detailticket.service');
const productService = require("../services/product.service");
const ticketService = require('../services/ticket.service');
const productController = {};

productController.renderProduct = async(req, res) => {
    try {
        const products = await productService.getlistProduct();
        res.render('product', { products });
    } catch (error) {
        res.render('product');
    }
}
productController.renderVet = async(req, res) => {
    try {
        const vets = await productService.getlistVet();
        res.render('vet', { vets });
    } catch (err) {
        console.log(err);
        res.render('vet');
    }
}
productController.renderListProduct = async(req, res) => {
    try {
        const products = await productService.getlistProduct();
        res.render("product_list", { products });
    } catch (error) {
        res.render('product_list');
    }
};
productController.renderCreateProduct = async(req, res) => {
    res.render("product_register");
};
productController.createProduct = async(req, res) => {
    try {
        console.log(req.body);
        const category = "PRODUCT";
        const img = req.file;
        if (!img) {
            req.flash('error', 'El formato de la imagen no esta soportado');
            return res.redirect("/create-product");
        }
        const { name, precio, stock, description_simple, description_html } = req.body;
        const obj = { name, precio, stock, description_simple, description_html, category, employeeId: req.user.id, img };

        const product = await productService.createProduct(obj);
        if (!product) {
            req.flash('error', 'Hubo un problema a la hora de crear el producto, intentelo denuevo');
            return res.redirect("/create-product");
        }
        req.flash("success", `El producto con codigo ${product.id} y nombre "${product.name}" se a creado con exito!`);
        res.redirect("/create-product");
    } catch (error) {
        console.log(error);
        req.flash('error', 'Hubo un problema a la hora de crear el producto, intentelo denuevo');
        return res.redirect("/create-product");
    }
};
productController.deleteProduct = async(req = request, res) => {
    try {
        console.log(req.params.id);
        const product = await productService.deleteProduct(req.params.id);
        if (!product) {
            req.flash('error', 'Hubo un error a la hora de eliminar el producto');
            return res.redirect('/list-product');
        }
        req.flash('success', `El producto con codigo ${req.params.id} se elimino correctamente`);
        res.redirect('/list-product');
    } catch (err) {
        console.log(err);
        res.redirect('/list-product');

    }

}
productController.renderUpdateProduct = async(req, res) => {
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
}
productController.updateProduct = async(req, res) => {
    try {
        const { name, precio, stock, description_simple, description_html } = req.body;
        const obj = { name, precio, stock, description_simple, description_html, id: req.params.id };
        const product = await productService.updateProduct(obj);
        if (!product) return res.redirect('/update-product');
        req.flash('success', `El producto con condigo ${req.params.id} se actualizo correctamente`);
        res.redirect('/list-product');
    } catch (err) {
        console.log(err);
        res.redirect('/update-product');
    }
}
productController.renderLisVet = async(req, res) => {
    try {
        const vets = await productService.getlistVet();
        res.render('vet_list', { vets });
    } catch (err) {
        console.log(err);
        res.render('vet_list');
    }
}
productController.renderCreateVet = (req, res) => res.render('vet_register');

productController.createVet = async(req, res) => {
    try {
        console.log(req.body);
        const category = "VET";
        const img = req.file;
        if (!img) {
            req.flash('error', 'El formato de la imagen no esta soportado');
            return res.redirect("/create-vet");
        }
        const { name, precio, description_simple, description_html } = req.body;
        const obj = { name, precio, description_simple, description_html, category, employeeId: req.user.id, img };
        const product = await productService.createVet(obj);

        if (!product) {
            req.flash('error', 'Hubo un problema a la hora de crear el servicio, intentelo denuevo');
            return res.redirect("/create-vet");
        }
        req.flash("success", `El servicio con codigo ${product.id} y nombre "${product.name}" se a creado con exito!`);
        res.redirect("/create-vet");
    } catch (error) {
        console.log(error);
        req.flash('error', 'Hubo un problema a la hora de crear el servicio, intentelo denuevo');
        return res.redirect("/create-vet");
    }
};

productController.addProducttoCart = async(req, res) => {
        try {
            if (req.user.role !== 'CLIENTE') return res.status(401).json({ msg: 'Necesita autenticarse' });

            console.log(req.body);
            const { productId, quantity, price, subtotal, name } = req.body;
            const clientId = req.user.id;

            let ticket = await ticketService.getTicketbyStatusClientId(clientId);
            if (!ticket) {
                ticket = await ticketService.createTicket({ status: 'PENDIENTE', clientId });
            }

            let detail = await detailTicketService.getDetailTicketbyProductId(ticket.id, productId);
            if (!detail) {
                detail = await detailTicketService.createDetailTikect({ quantity, price, subtotal, ticketId: ticket.id, productId, name });
            } else {
                detail = await detailTicketService
                    .updateDetailTicket({
                        ticketId: ticket.id,
                        productId,
                        quantity: Number(detail.quantity) + Number(quantity),
                        subtotal: parseFloat(detail.subtotal) + parseFloat(subtotal)
                    });
            }
            if (!detail) return res.status(400).json({ msg: 'Hubo un problema con los datos enviados' })

            res.status(200).json({ msg: "200 ok" });
        } catch (error) {
            res.status(500).json({ error });
        }

    }
    /* Shopping Cart */
productController.renderShoppingCart = async(req, res) => {
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
}
module.exports = productController;