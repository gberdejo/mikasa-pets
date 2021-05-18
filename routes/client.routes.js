const { Router } = require("express");
const router = Router();

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const {uploadFile } = require('../aws/s3');
const {resize} = require("../settings/sharp");

const clientController = require('../controllers/client.controller');
const upload = require('../configs/multer');

router.get('/profile',clientController.renderProfile);
router.get('/image',(req,res)=>res.render('upload'));
router.post('/image',upload.single('avatar'), async (req,res)=>{
    
    try {
        const file = req.file;
        if(!file) return res.json({msg:'El tipo de imagen no es permitido'});
        console.log(file);
        const fileImg = fs.createReadStream(file.path);
        fileImg.pipe(res);
        const fileimg = await resize(file.path);
        fileimg.pipe(res);
        const datas3 = await uploadFile(fileimg,file.originalname);
        console.log(datas3);
    } catch (error) {
        console.log(error);
        res.status(400).json({msg:'algo se malogro'});
    }
 

});
/*router.get('/images/:key',  (req,res)=>{
        const key = req.params.key;
        const readStream =  getFileStream(key);
        readStream.pipe(res); 
})*/

module.exports = router;
