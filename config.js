module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
        dev: process.env.DEV
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret'
    }
}