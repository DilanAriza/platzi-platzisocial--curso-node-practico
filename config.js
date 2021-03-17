module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3003,
        dev: process.env.DEV || true
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret'
    },
    mysql: {
        host: process.env.MYSQL_HOST || '',
        user: process.env.MYSQL_USER || '',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DATABASE || '',
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