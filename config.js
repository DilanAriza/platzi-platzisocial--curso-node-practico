module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3000,
        dev: process.env.DEV || true
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || 'FiocO3eeu0',
        password: process.env.MYSQL_PASSWORD || 'VCpszzRNIo',
        database: process.env.MYSQL_DATABASE || 'FiocO3eeu0',
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