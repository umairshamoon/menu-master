const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/index');
module.exports = {
  isLogin: function (req, res, next) {
    const token = req.header('Authorization');

    if (!token)
      return res
        .status(401)
        .json({ message: 'you are not logged in' });
    try {
      const decoded = jwt.verify(token, SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.json(error);
      res.status(400).json({
        message: 'Your session has expired. Please login again',
      });
    }
  },
  isWorker: function (req, res, next) {
    if (!req?.user?.isWorker)
      return res
        .status(403)
        .json({ message: 'forbidden access' });
    next();
  },
  isChef: function (req, res, next) {
    if (!req?.user?.isChef)
      return res
        .status(403)
        .json({ message: 'forbidden access' });
    next();
  },
};
