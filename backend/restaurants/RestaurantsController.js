const express = require("express");
const router = express.Router();
const { Restaurants } = require("../_helpers/db");
const { isLogin, isWorker, isChef } = require("../middleware");

// routes
// router.get("/:id", getById);
// router.put("/:id", isLogin, update);
// router.delete("/:id", _delete);

const create = async (req, res) => {
  try {
    req.body.createdBy = req.user.sub;
    await Restaurants.create(req.body);
    res.status(201).json({ message: "Restaurant Created" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const restaurants = await Restaurants.find({});
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
};
router.post("/add", isLogin, create);
router.get("/", isLogin, getAll);
module.exports = router;
