const response = require('./response');
const config = require('./../config');

console.log(config)

function errors(err, req, res, next) {

    (config.api.dev) ? console.error(`[ERROR] - [RESPONSE] - ${err}`): console.error(`[ERROR] - ${err}`);

    const message = err.message || 'Error interno';
    const status = err.statusCode || 500;

    response.error(req, res, message, status);
}

module.exports = errors;