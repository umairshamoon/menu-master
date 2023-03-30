const config = require("../config");
const mongoose = require("mongoose");
const { NODE_ENV, MONGODB_URI } = require("../config/index");

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

if (NODE_ENV === "test") {
  var MockMongoose = require("mock-mongoose").MockMongoose;
  var mockMongoose = new MockMongoose(mongoose);

  mockMongoose.prepareStorage().then(function () {
    mongoose.connect(MONGODB_URI || config.connectionString, connectionOptions);
  });
} else {
  mongoose
    .connect(MONGODB_URI || config.connectionString, connectionOptions)
    .then(console.log("conected to " + MONGODB_URI))
    .catch((e) => {
      console.log("e=>", e.message);
    });
}

mongoose.Promise = global.Promise;

module.exports = {
  User: require("../users/UserModel"),
  Recipes: require("../recipe/RecipeModel"),
  Inventory: require("../inventory/InventoryModel"),
  Shift: require("../shift/shiftModel"),
  Order: require("../order/OrderModel"),
  Restaurants: require("../restaurants/RestaurantsModel"),
};
