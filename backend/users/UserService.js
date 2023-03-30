const { SECRET } = require("../config/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const User = db.User;

module.exports = {
  authenticate,
  getWorkers,
  getChefs,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function authenticate({ email, password, type }) {
  const user = await User.findOne({ email });
  if (user && user.type !== type) {
    return null;
  }

  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user.id }, SECRET, {
      expiresIn: "7d",
    });
    return {
      ...user.toJSON(),
      token,
    };
  }
}

async function getWorkers() {
  const user = await User.find();
  return {
    user,
  };
}

async function getChefs({ type }) {
  const user = await User.find({ type });
  return {
    user,
  };
}

async function getAll() {
  return await User.find();
}

async function getById(id) {
  return await User.findById(id);
}

async function create(data) {
  // validate
  if (await User.findOne({ email: data.email })) {
    throw 'Username "' + data.email + '" is already taken';
  }
  const address = {
    house: data.house,
    postalCode: data.postalCode,
    street: data.street,
    state: data.state,
    city: data.city,
  };
  data.address = address;

  // hash password
  if (data.password) {
    data.hash = bcrypt.hashSync(data.password, 10);
  }

  // save user
  await User.create(data);
}

async function update(id, data) {
  const user = await User.findById(id);

  // validate
  if (!user) throw "User not found";
  if (
    user.email !== data.email &&
    (await User.findOne({ email: data.email }))
  ) {
    throw 'Username "' + data.email + '" is already taken';
  }

  // hash password if it was entered
  if (data.password) {
    data.hash = bcrypt.hashSync(data.password, 10);
  }
  const address = {
    house: data.house,
    postalCode: data.postalCode,
    street: data.street,
    state: data.state,
    city: data.city,
  };
  data.address = address;

  // copy userParam properties to user
  await user.updateOne(data);
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}
