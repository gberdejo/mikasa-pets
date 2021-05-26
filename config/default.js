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
    morgan: 'dev',
}