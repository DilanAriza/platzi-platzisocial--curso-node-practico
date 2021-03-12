//Libs
const jwt = require('jsonwebtoken');

//Modules
const config = require('../config');
const { err } = require('../utils/errors');


const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
}

function verify(token) {
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        return new Error(error.message);
    }
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);

        if (decoded.id !== owner) throw err('No tienes permisos para realizar esta acción', 401);
    },
    logged: function(req, owner) {
        const decoded = decodeHeader(req);
    },
}

function getToken(auth) {
    if (!auth) {
        throw new Error('no viene token');
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw new Error('Formato invalido');
    }

    let token = auth.replace('Bearer ', '');

    return token
}


function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded
}

module.exports = {
    sign,
    check,
}