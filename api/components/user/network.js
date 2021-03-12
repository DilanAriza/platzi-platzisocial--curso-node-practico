//Express
const express = require('express');
const router = express.Router();

//Response & Controller
const response = require('../../../network/response');
const secure = require('./secure');
const Controller = require('./index');

router.use(express.json())

//Routes 
router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure('update'), upsert);
router.post('/follow/:id', secure('follow'), follow);
router.post('/followers', secure('followers'), followers);



//Functions
function list(req, res, next) {
    Controller.list()
        .then(list => response.success(req, res, list, 200))
        .catch(next)
}

function get(req, res, next) {
    Controller.get(req.params.id)
        .then(user => response.success(req, res, user, 200))
        .catch(next)
}

function upsert(req, res, next) {
    Controller.upsert(req.body)
        .then(user => response.success(req, res, user, 201))
        .catch(next)
}

function follow(req, res, next) {
    Controller.follow(req.user.id, req.params.id)
        .then(data => response.success(req, res, data, 201))
        .catch(next)
}

function followers(req, res, next) {
    Controller.followers(req.user.id)
        .then(data => response.success(req, res, data, 201))
        .catch(next)
}

module.exports = router;