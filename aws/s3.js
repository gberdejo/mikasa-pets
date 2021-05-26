const S3 = require('aws-sdk/clients/s3');

const config = require('config');

const bucketName = config.get('s3.bucketName');
const region = config.get('s3.bucketRegion');
const accessKeyId = config.get('s3.secretKey');
const secretAccessKey = config.get('s3.accessKey');

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

const uploadFile = (fileStream, fileName) => {
    return new Promise((resolve, reject) => {
        s3.upload({
            Bucket: bucketName,
            Body: fileStream,
            Key: fileName,
        }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
const deleteFile = (key) => {
    return new Promise((resolve, reject) => {
        s3.deleteObject({
            Bucket: bucketName,
            Key: key
        }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}
module.exports = { uploadFile, deleteFile };