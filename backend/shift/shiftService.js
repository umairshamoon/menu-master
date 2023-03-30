const db = require("_helpers/db");
const Shift = db.Shift;
const User = db.User;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await Shift.find()
    .populate("addedBy")
    .populate("lastUpdatedBy")
    .populate("employees");
}

async function getById(id) {
  return await Shift.findById(id)
    .populate("addedBy")
    .populate("lastUpdatedBy")
    .populate("employees");
}

async function create(data) {
  // validate
  await Shift.create(data);
}

async function update(id, data, employee) {
  const shift = await Shift.findById(id);
  let shiftFlag = true;
  if (!shift)
    // validate
    throw "shift not found";
  if (employee != "") {
    shift.employees.map((s) => {
      if (s == employee) shiftFlag = false;
    });
    if (shiftFlag) {
      shift.employees.push(employee);
      await shift.save();
    }
  }
  await shift.updateOne(data);
}

async function _delete(id) {
  const response = await Shift.findByIdAndRemove(id);
}
