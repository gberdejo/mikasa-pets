const DetailTicket = require('../models/detail.ticket');
const { Op, AccessDeniedError } = require('sequelize');
const productService = require('./product.service');
const detailTicketService = {};

detailTicketService.createDetailTikect = async(obj) => {
    try {
        const detailTicket = DetailTicket.build(obj);
        if (!(detailTicket instanceof DetailTicket)) return null;
        await detailTicket.save();
        return detailTicket;
    } catch (error) {
        console.log(error);
        return null
    }
}
detailTicketService.getDetailTicketbyId = async(id) => {
    try {
        const detailTicket = await DetailTicket.findByPk(id);
        if (!detailTicket) return null;
        return detailTicket;
    } catch (error) {
        console.log(error);
        return null;
    }
}
detailTicketService.getDetailTicketbyProductId = async(ticketId, productId) => {
    try {
        const detailTicket = await DetailTicket.findOne({
            where: {
                [Op.and]: [{ ticketId }, { productId }],
            }
        })
        if (!detailTicket) return null;
        return detailTicket;
    } catch (error) {
        console.log(error);
        return null;
    }
}
detailTicketService.updateDetailTicket = async(obj) => {
    try {
        const detail = await DetailTicket.update({
            quantity: obj.quantity,
            subtotal: obj.subtotal
        }, {
            where: {
                [Op.and]: [{ ticketId: obj.ticketId }, { productId: obj.productId }],
            }
        });
        return {
            detail,
            quantity: obj.quantity,
            subtotal: obj.subtotal,
            ticketId: obj.ticketId,
            productId: obj.productId
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}
detailTicketService.listDetailTicket = async(ticketId) => {
    let list = [];
    try {
        const raw = await DetailTicket.findAll({
            where: {
                ticketId
            }
        });
        console.log(raw);
        if (raw.length >= 0) {
            raw.map((data) => {
                list.push(data.dataValues);
            });
        }
        return list;
    } catch (error) {
        console.log(error);
        return list
    }
}
module.exports = detailTicketService;