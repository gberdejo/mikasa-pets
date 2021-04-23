
const homePag = (req,res)=>{
    return res.render('index',{
        name: false
    });
}

module.exports={
    homePag
}