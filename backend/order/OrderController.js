const express = require('express')
const router = express.Router()
const orderService = require('./OrderService')
const { isLogin, isWorker, isChef } = require('../middleware')

// routes
router.get('/', getAll)
router.post('/add', isLogin, create)
router.get('/:id', getById)
router.put('/:id', isLogin, update)
router.delete('/:id', _delete)

module.exports = router

function create(req, res, next) {
  req.body.createdBy = req.user.sub
  orderService
    .create(req.body)
    .then(() => res.json('Inventory has been created'))
    .catch((err) => next(err))
}

function getAll(req, res, next) {
  orderService
    .getAll()
    .then((inventorys) => res.json(inventorys))
    .catch((err) => next(err))
}

function getById(req, res, next) {
  orderService
    .getById(req.params.id)
    .then((inventory) =>
      inventory ? res.json(inventory) : res.sendStatus(404)
    )
    .catch((err) => next(err))
}

function update(req, res, next) {
  orderService
    .update(req.params.id, req.body)
    .then(() => res.json('order has been updated'))
    .catch((err) => next(err))
}

function _delete(req, res, next) {
  orderService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err))
}
