const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,'./uploads');
  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname);
  }
})
const fileFilter = (req,file,cd)=>{
  if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
    cd(null,true);
  }else{
    cb(null,false);
  }
}
const upload = multer({storage,fileFilter});
module.exports = upload;