const express = require('express')
const router = express.Router()
const inventoryService = require('./InventoryService')
const { isLogin, isWorker, isChef } = require('../middleware')

// routes
router.get('/', getAll)
router.post('/add', isLogin, create)
router.get('/:id', getById)
router.put('/:id', isLogin, update)
router.delete('/:id', _delete)

module.exports = router

function create(req, res, next) {
  req.body.units.map((u) => (u.fixed = u.quantity))
  req.body.addedBy = req.user.sub
  req.body.lastUpdatedBy = req.user.sub
  inventoryService
    .create(req.body)
    .then(() => res.json('Inventory has been created'))
    .catch((err) => next(err))
}

function getAll(req, res, next) {
  inventoryService
    .getAll()
    .then((inventorys) => res.json(inventorys))
    .catch((err) => next(err))
}

function getById(req, res, next) {
  inventoryService
    .getById(req.params.id)
    .then((inventory) =>
      inventory ? res.json(inventory) : res.sendStatus(404)
    )
    .catch((err) => next(err))
}

function update(req, res, next) {
  req.body.lastUpdatedBy = req.user.sub
  inventoryService
    .update(req.params.id, req.body)
    .then(() => res.json('Inventory has been updated'))
    .catch((err) => next(err))
}

function _delete(req, res, next) {
  inventoryService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err))
}
