const db = require('_helpers/db')
const Inventory = db.Inventory

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
}

async function getAll() {
  return await Inventory.find()
    .populate('addedBy')
    .populate('lastUpdatedBy')
}

async function getById(id) {
  return await Inventory.findById(id)
    .populate('addedBy')
    .populate('lastUpdatedBy')
}

async function create(data) {
  await Inventory.create(data)
}

async function update(id, data) {
  const inventory = await Inventory.findById(id)

  // validate
  if (!inventory) throw 'inventory not found'
  if (
    inventory.itemName !== data.itemName &&
    (await Inventory.findOne({ itemName: data.itemName }))
  ) {
    throw (
      'Inventory name "' + data.username + '" is already taken'
    )
  }

  await inventory.updateOne(data)
}

async function _delete(id) {
  const response = await Inventory.findByIdAndRemove(id)
}
