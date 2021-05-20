module.exports = {
    server: {
        port: 8080
    },
    mysql: {
        database: 'mikasapet',
        user: 'root',
        password: 'mysql',
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,

    },
    session: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'mysql',
        database: 'sessionstore'
    },
}