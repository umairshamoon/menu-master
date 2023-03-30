require("dotenv").config();
require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const jwt = require("_helpers/jwt");
const errorHandler = require("_helpers/error-handler");
const { NODE_ENV, PORT } = require("./config/index");
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan("dev"));

// api routes
app.use("/api/users", require("./users/UserController"));
app.use("/api/recipes", require("./recipe/RecipeController"));
app.use("/api/order", require("./order/OrderController"));
app.use("/api/shift", require("./shift/shiftController"));
app.use("/api/inventory", require("./inventory/InventoryController"));
app.use("/api/restaurant", require("./restaurants/RestaurantsController"));
// global error handler
app.use(errorHandler);

// start server
const port = NODE_ENV === "production" ? PORT || 80 : 4000;
const server = app.listen(port, function () {
  console.clear();
  console.log("Server listening on port " + port);
});
