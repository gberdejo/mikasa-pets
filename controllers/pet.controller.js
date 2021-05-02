const Pet = require('../models/pet');
const petController = {
    createPet: async(req, res) => {
        const { name_pet, birthdata_pet } = req.body;
        let list_pet = [];
        try {
            const pet = await Pet.create({
                name_pet,
                birthdata_pet,
                clientId: req.session.userid
            });
            const raw = await Pet.findAll({
                clientId: req.session.id
            })
            if(raw){
                raw.map((data)=>{
                    list_pet.push(data.dataValues);
                });
            }
            console.log(list_pet);
            return res.render('client/list_pet',{
                usersession: req.session.usersession,
                list_pet

            });
        } catch (error) {
            console.log(error);
            return res.render('client/register_pet',{
                usersession: req.session.usersession
            })
        }
    },
    listPet: async(req,res)=>{
        let list_pet = [];
        try {
            const raw = await Pet.findAll({
                clientId: req.session.id
            });
            if(raw){
                raw.map((data)=>{
                    list_pet.push(data.dataValues);
                });
            }
            console.log(raw);
            return res.render('client/list_pet',{
                usersession: req.session.usersession,
                list_pet
            });
        } catch (error) {
            console.log(error);
            return res.render('client/register_pet',{
                usersession: req.session.usersession
            })
        }
    }
};



module.exports = petController;