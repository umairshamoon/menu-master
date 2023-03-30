const db = require('_helpers/db')
const Recipes = db.Recipes

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
}

async function getAll() {
  return await Recipes.find()
    .populate({
      path: 'ingredients',
      populate: { path: 'ingredient', model: 'Inventory' },
    })
    .populate({
      path: 'useId',
      modal: 'User',
    })
}

async function getById(id) {
  return await Recipes.findById(id).populate({
    path: 'ingredients',
    populate: { path: 'ingredient', model: 'Inventory' },
  })
}

async function create(data) {
  await Recipes.create(data)
}

async function update(id, data) {
  const recipe = await Recipes.findById(id)
  // validate
  if (!recipe) throw 'recipe not found'

  // copy userParam properties to user
  Object.assign(recipe, data)

  await recipe.save()
}

async function _delete(id) {
  await Recipes.findByIdAndRemove(id)
}
