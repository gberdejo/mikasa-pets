const sharp = require('sharp');


const resize = async (path)=>{
   return new Promise((resolve,reject)=>{
       sharp(path)
                .resize({
                    width: 300,
                    height:438
                })
                .modulate({
                    brightness: 1,
                    saturation: 1
                })
                .png()
                .toBuffer((err,buffer)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(buffer);
                    }
                })
   });
}
module.exports = {resize};

