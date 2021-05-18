const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
const bcript = require('bcryptjs');
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey= process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})
const uploadFile = (file)=>{
    const fileStream = fs.createReadStream(file.path);
    return new Promise((resolve,reject)=>{
        s3.upload({
            Bucket:bucketName,
            Body: fileStream,
            Key:file.originalname,
        },(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })

    });
}
const uploadFile2 = (fileStream,fileName)=>{
    return new Promise((resolve,reject)=>{
        s3.upload({
            Bucket:bucketName,
            Body: fileStream,
            Key:fileName,
        },(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })

    });
}
 module.exports = {uploadFile,uploadFile2};