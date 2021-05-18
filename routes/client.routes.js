const { Router } = require("express");
const router = Router();

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const {uploadFile2 } = require('../configs/s3');

const clientController = require('../controllers/client.controller');
const upload = require('../configs/multer');

router.get('/profile',clientController.renderProfile);
router.get('/image',(req,res)=>res.render('upload'));
router.post('/image',upload.single('avatar'), async (req,res)=>{
    try {
        const file = req.file;
        const fileout =path.join(__dirname,'../','uploads/images',file.originalname);
        console.log(file);
        await sharp(file.path)
            .resize({
                width: 300,
                height:438
            })
            .modulate({
                brightness: 1,
                saturation: 1
            })
            .png()
            .toFile(fileout);
        
        const imgFile = fs.createReadStream(fileout);
        imgFile.pipe(res);
        const datas3 = await uploadFile2(imgFile,file.originalname);
        console.log(datas3);
        fs.unlinkSync(file.path);
        fs.unlinkSync(fileout);
     
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
