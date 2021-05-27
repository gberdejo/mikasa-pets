const path = require('path');
module.exports = {
    server: {
        port: 3000
    },
    //conect DB
    mysql: {
        database: 'mikasapet',
        databaseSession: 'sessionstore',
        user: 'root',
        password: 'mysql',
        host: 'localhost',
        port: 3306,
        ssl: false
    },
    s3: {
        bucketName: 'my-bucket-mikasapet',
        bucketRegion: 'us-east-2',
        accessKey: 'AKIATQLYNOLCQM7SDWV7',
        secretKey: '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'

    },
    morgan: 'dev',
    path: {
        root: path.join(__dirname, '../'),
        uploads: path.join(__dirname, '../', 'uploads'),
        edits: path.join(__dirname, '../', 'public', 'img')
    }
}