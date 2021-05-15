const DetailTicket = require('../models/detail.ticket');
const { Op } = require('sequelize');
const detailTicketService = {};

detailTicketService.createDetailTikect = async (obj)=>{
    try {
        const detailTicket = DetailTicket.build(obj);
        if(!(detailTicket instanceof DetailTicket)) return null;
        await detailTicket.save();
        return detailTicket;
    } catch (error) {
        console.log(error);
        return null
    }
}
detailTicketService.getDetailTicketbyId = async (id)=>{
    try {
        const detailTicket = await DetailTicket.findByPk(id);
        if(!detailTicket) return null;
        return detailTicket;
    } catch (error) {
        console.log(error);
        return null;
    }
}
detailTicketService.getDetailTicketbyProductId = async (ticketId,productId)=>{
    try {
        const detailTicket = await DetailTicket.findOne({
            where:{
            [Op.and]: [{ ticketId }, { productId }],  
            }
        })
        if(!detailTicket) return null;
        return detailTicket;
    } catch (error) {
        console.log(error);
        return null;
    }
}
detailTicketService.updateDetailTicket = async (obj) =>{
    try {
        await DetailTicket.update({
            quantity : obj.quantity,
            subtotal: obj.subtotal
        },{
            where:{
                 [Op.and]: [{ ticketId:obj.ticketId }, { productId:obj.productId }],  
            }
        });
        return {
            quantity : obj.quantity,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
} 
module.exports = detailTicketService;