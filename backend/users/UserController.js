const express = require("express");
const router = express.Router();
const userService = require("./UserService");
const cloudinary = require("../_helpers/cloudinary");
const upload = require("../middleware/multer");
const bufferConversion = require("../_helpers/bufferConversion");
// routes
router.post("/authenticate", authenticate);
router.post("/getWorkers", getWorkers);
router.post("/getChefs", getChefs);
router.post("/register", upload.single("image"), register);
router.get("/", getAll);
router.get("/current", getCurrent);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Email or password is incorrect" })
    )
    .catch((err) => next(err));
}
function getWorkers(req, res, next) {
  userService
    .getWorkers(req.body)
    .then((user) => {
      user
        ? res.json(user)
        : res.status(400).json({ message: "Users not found" });
    })
    .catch((err) => next(err));
}
function getChefs(req, res, next) {
  userService
    .getChefs(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Users not found" })
    )
    .catch((err) => next(err));
}

async function register(req, res, next) {
  try {
    const { originalname, buffer } = req.file;
    if (!originalname) throw Error("Upload Image");
    const { secure_url } = await cloudinary(
      bufferConversion(originalname, buffer)
    );
    req.body.image = secure_url;
    userService
      .create(req.body)
      .then(() => res.json("user has been created"))
      .catch((err) => next(err));
  } catch (err) {
    res.json(err);
  }
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
}

function getCurrent(req, res, next) {
  userService
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then(() => res.json("user updated"))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
