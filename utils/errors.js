const debug = require('debug')('api:error');
const config = require('./../config');
const response = require('./../network/response');

function err(message, code) {
    let e = new Error(message);

    if (code) e.statusCode = code;

    return e;
}

function logErrors(err, req, res, next) {
    console.error(`[ERROR] - [SERVER] - [${Date.now()}] - ${err}`);
    debug(err.stack);
    next(err);
}

function withErrorStack(err, stack) {
    if (config.api.dev) {
        return {...err, stack }
    }

    return err;
}

function errorHandler(err, req, res, next) {
    const { statusCode } = err;
    response.error(req, res, withErrorStack(err, err.stack), statusCode)
}

module.exports = {
    errorHandler,
    logErrors,
    err
}