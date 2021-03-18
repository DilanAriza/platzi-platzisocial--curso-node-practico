//Express
const express = require('express');
const router = express.Router();

//Response & Controller
const response = require('../../network/response');
const Store = require('../../store/mysql');

router.use(express.json())

//Routes 
router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.put('/:table', upsert);


//Functions
async function list(req, res, next) {
    const data = await Store.list(req.params.table)

    response.success(req, res, data, 200);
}
async function get(req, res, next) {
    const data = await Store.get(req.params.table, req.params.id)

    response.success(req, res, data, 200);
}
async function insert(req, res, next) {
    const data = await Store.upsert(req.params.table, req.body);

    response.success(req, res, data, 201);
}
async function upsert(req, res, next) {
    const data = await Store.upsert(req.params.table, req.body)

    response.success(req, res, data, 201);
}

module.exports = router;