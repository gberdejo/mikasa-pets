const sharp = require('sharp');


const resizeProduct = async (path)=>{
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
const resizePet = async (path)=>{
   return new Promise((resolve,reject)=>{
       sharp(path)
                .resize({
                    width: 600,
                    height:300
                })
                .modulate({
                    brightness: 1,
                    saturation: 2
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
module.exports = {resizeProduct,resizePet};

