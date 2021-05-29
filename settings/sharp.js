const sharp = require('sharp');
const path = require('path');
const config = require('config');

const resizeProduct = (img) => {
    const extencion = path.extname(img.path);
    const originalname = path.basename(img.path, extencion);
    const filename = `${originalname}.png`;
    const pathEdit = path.join(config.get('path.edits'), filename);
    return new Promise((resolve, reject) => {
        sharp(img.path)
            .resize({
                width: 150,
                height: 200
            })
            .modulate({
                brightness: 1,
                saturation: 1
            })
            .png({ compressionLevel: 6 })
            .toFile(pathEdit,
                (err, info) => {
                    if (err) {
                        reject(err);
                    } else {
                        info.filename = filename;
                        info.path = pathEdit;
                        resolve(info);
                    }
                });
    });
}
const resizeVet = (img) => {
    const extencion = path.extname(img.path);
    const originalname = path.basename(img.path, extencion);
    const filename = `${originalname}.jpeg`;
    const pathEdit = path.join(config.get('path.edits'), filename);
    return new Promise((resolve, reject) => {
        sharp(img.path)
            .resize({
                width: 500,
                height: 200
            })
            .modulate({
                brightness: 1,
                saturation: 1
            })
            .jpeg({ compressionLevel: 6 })
            .toFile(pathEdit,
                (err, info) => {
                    if (err) {
                        reject(err);
                    } else {
                        info.filename = filename;
                        info.path = pathEdit;
                        resolve(info);
                    }
                });
    });
}
const resizePet = (img) => {
    return new Promise((resolve, reject) => {
        const extencion = path.extname(img.path);
        const originalname = path.basename(img.path, extencion);
        const filename = `${originalname}.jpeg`;
        const pathEdit = path.join(config.get('path.edits'), filename);
        sharp(img.path)
            .resize({
                width: 500,
                height: 300
            })
            .modulate({
                brightness: 1,
                saturation: 2
            })
            .jpeg({ compressionLevel: 6 })
            .toFile(pathEdit,
                (err, info) => {
                    if (err) {
                        reject(err);
                    } else {
                        info.filename = filename;
                        info.path = pathEdit;
                        resolve(info);
                    }
                });
        /*.toBuffer((err,buffer)=>{
            if(err){
                reject(err);
            }else{
                resolve(buffer);
            }
        })*/
    });
}
module.exports = { resizeProduct, resizePet, resizeVet };