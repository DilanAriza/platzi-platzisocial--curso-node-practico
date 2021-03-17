module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
        dev: process.env.DEV
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret'
    },
    mysql: {
        host: process.env.MYSQL_HOST || '0',
        user: process.env.MYSQL_USER || '0',
        password: process.env.MYSQL_PASSWORD || '0',
        database: process.env.MYSQL_DATABASE || '0',
    },
    mysql_service: {
        port: process.env.MICROS_MYSQL_PORT || 3001,
        host: process.env.MICROS_MYSQL_HOST || 'localhost'
    },
    post_service: {
        port: process.env.MICROS_POST_PORT || 3002,
        host: process.env.MICROS_POST_HOST || 'localhost'
    },
}