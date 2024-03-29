//Express
const express = require('express');
const router = express.Router();

//Response & Controller
const response = require('../../../../network/response');
const Controller = require('./index');

//Secure
const secure = require('./secure');

//Middewares
router.use(express.json())

//Routes 
router.get('/', list);
router.get('/:id', get);
router.get('/user/:id', getByUser);
router.post('/', secure('create'), upsert);
router.delete('/:id', secure('delete'), remove);

router.get('/:id/like', secure('list'), postLikers);
router.post('/:id/like', secure('like'), like);
router.delete('/:id/like', secure('unLiked'), unLiked);

//Functions
function list(req, res, next) {
    Controller.list()
        .then(data => response.success(req, res, data, 200))
        .catch(next)
}

function upsert(req, res, next) {
    Controller.upsert(req.user.id, req.body)
        .then(data => response.success(req, res, data, 201))
        .catch(next)
}

function get(req, res, next) {
    Controller.get(req.params.id)
        .then(data => response.success(req, res, data, 200))
        .catch(next)
}

function getByUser(req, res, next) {
    Controller.getByUser(req.params.id)
        .then(data => response.success(req, res, data, 200))
        .catch(next)
}

function remove(req, res, next) {
    Controller.remove(req.user.id, req.params.id)
        .then(data => response.success(req, res, data, 204))
        .catch(next)
}

function like(req, res, next) {
    Controller.like(req.params.id, req.user.id)
        .then(data => response.success(req, res, data, 201))
        .catch(next)
}

function postLikers(req, res, next) {
    Controller.postLikers(req.params.id)
        .then(data => response.success(req, res, data, 200))
        .catch(next)
}

function unLiked(req, res, next) {
    Controller.unLiked(req.params.id, req.user.id)
        .then(data => response.success(req, res, data, 204))
        .catch(next)
}

module.exports = router;