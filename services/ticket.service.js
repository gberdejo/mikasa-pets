const Ticket = require('../models/ticket');
const {Op} = require('sequelize');
const ticketService = {};

ticketService.createTicket = async (obj)=>{
    try {
        const ticket = Ticket.build(obj);
        if(!(ticket instanceof Ticket)) return null;
        await ticket.save();
        return ticket;
    } catch (error) {
        console.log(error);
        return null;
    }
}
ticketService.getTicketbyID = async (id)=>{
    try {
        const ticket = await Ticket.findByPk(id);
        if(!ticket) return null;
        return ticket
    } catch (error) {
        console.log(error);
        return null;
        
    }
}
ticketService.getLastTicketbyStatus = async (status = 'PENDIENTE')=>{
    try {
        const ticket = await Ticket.findOne({
            where:{
                status:{
                    [Op.eq]:status
                }
            }
        });
        if(!ticket) return null;
        return ticket;
    } catch (error) {
        console.log(error);
        return null;
        
    }
}




module.exports = ticketService;