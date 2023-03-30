const express = require("express");
const router = express.Router();
const shiftService = require("./ShiftService");
const db = require("../_helpers/db");
const Shift = db.Shift;
const User = db.User;
const { isLogin, isWorker, isChef } = require("../middleware");

// routes
router.get("/", getAll);
router.post("/create", isLogin, create);
router.get("/:id", getById);
router.put("/:id", isLogin, update);
router.patch("/add/employee/:employeeId/:id", isLogin, addEmployee);
router.patch("/remove/employee/:employeeId/:id", isLogin, removeEmployee);
router.delete("/:id", _delete);

module.exports = router;

function create(req, res, next) {
  req.body.addedBy = req.user.sub;
  req.body.lastUpdatedBy = req.user.sub;
  shiftService
    .create(req.body)
    .then(() => res.json("Shift has been created"))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  shiftService
    .getAll()
    .then((shifts) => res.json(shifts))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  shiftService
    .getById(req.params.id)
    .then((shift) => {
      res.json(shift);
    })
    .catch((err) => res.json(err));
}

function update(req, res, next) {
  const employee = req.body.employee;
  shiftService
    .update(
      req.params.id,
      {
        title: req.body.title,
        day: req.body.day,
        to: req.body.to,
        from: req.body.from,
        lastUpdatedBy: req.user.sub,
      },
      employee
    )
    .then(() => res.json("Shift Updated"))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  shiftService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
async function addEmployee(req, res) {
  const { id, employeeId } = req.params;
  const shift = await Shift.findById(id);
  let flag = false;
  shift.employees.map((s) => {
    if (s == employeeId) flag = true;
  });
  if (flag)
    return res.json({
      message: "user already assigned this shif",
    });
  shift.employees.push(employeeId);
  await shift.save();
  res.json({ message: "use assigned" });
}

async function removeEmployee(req, res) {
  const { id, employeeId } = req.params;
  const shift = await Shift.findById(id);

  const index = shift.employees.indexOf(employeeId);
  shift.employees.splice(index, 1);
  await shift.save();
  res.json({ message: "user removed" });
}
