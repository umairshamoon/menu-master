const db = require('_helpers/db')
const { Order, Recipes, Inventory } = db

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
}

async function getAll() {
  return await Order.find().populate({
    path: 'details',
    populate: { path: 'recpieId', model: 'Recipes' },
  })
}

async function getById(id) {
  return await Order.findById(id).populate({
    path: 'details',
    populate: { path: 'recpieId', model: 'Recipes' },
  })
}

async function create(data) {
  await Order.create(data)
}

async function update(id, data) {
  const order = await Order.findById(id)
  if (!order.flag) {
    return console.log('order aready completed')
  }
  if (order.flag) {
    if (data.status == 'complete') {
      order.details.map(async (d, i) => {
        const { ingredients } = await Recipes.findById({
          _id: d.recpieId,
        }).select('ingredients')
        ingredients.map(async (ingredient) => {
          const item = await Inventory.findById(
            ingredient.ingredient
          ).select('units')

          item.units.reverse().map((u, i) => {
            u.isOpened = true
            if (i == 0) {
              u.quantity -= d.quantity * ingredient.quantity
            }
            let flag = true
            while (flag) {
              if (u.quantity <= 0 && i < item.units.length - 1) {
                u.quantity += u.fixed
                item.units[i + 1].quantity -= 1
                flag = false
                if (u.quantity <= 0) flag = true
              } else flag = false
            }
          })
          item.units.reverse()
          await item.save()
        })
      })
      data.flag = false
    }
  }

  await order.updateOne(data)
}

async function _delete(id) {
  const response = await Order.findByIdAndRemove(id)
}
