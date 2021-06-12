const { Router } = require("express");
const router = Router();

const clientController = require("../controllers/client.controller");
const upload = require("../settings/multer");
router.get("/miscompras", clientController.renderMisCompras);
router.get("/miscitas", clientController.renderMisCitas);
router.get("/profile-client", clientController.renderProfileClient);
router.get("/image", (req, res) => res.render("upload"));
router.post("/image", upload.single("avatar"), async (req, res) => {
  try {
    /*const file = req.file;
        if(!file) return res.json({msg:'El tipo de imagen no es permitido'});
        console.log(file);
        const datas3 = await uploadFile(fileimg,file.originalname);
        console.log(datas3);*/
    res.json({ message: "ok" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "algo se malogro" });
  }
});
/*router.get('/images/:key',  (req,res)=>{
        const key = req.params.key;
        const readStream =  getFileStream(key);
        readStream.pipe(res); 
})*/

module.exports = router;
