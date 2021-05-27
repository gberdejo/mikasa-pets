module.exports = {
    server: {
        port: 'PORT'
    },
    //conect DB
    mysql: {
        database: 'DB_NAME',
        databaseSession: 'DB_SESSION_NAME',
        user: 'DB_USER',
        password: 'DB_PASS',
        host: 'DB_HOST',
        port: 'DB_PORT',
        ssl: 'DB_SSL'
    },
    s3: {
        bucketName: 'AWS_BUCKET_NAME',
        bucketRegion: 'AWS_BUCKET_REGION',
        accessKey: 'AWS_ACCESS_KEY',
        secretKey: 'AWS_SECRET_KEY'

    }
}