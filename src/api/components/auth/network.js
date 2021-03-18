//Express
const express = require('express');
const router = express.Router();

//Response & Controller
const response = require('../../../network/response');
const Controller = require('./index');

router.use(express.json())

//Routes 
router.post('/login', login);


//Functions
function login(req, res) {
    Controller.login(req.body.username, req.body.password)
        .then(token => response.success(req, res, token, 200))
        .catch(err => response.error(req, res, 'información invalida', 400))
}


module.exports = router;