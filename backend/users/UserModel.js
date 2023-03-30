const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  fName: { type: String },
  lName: { type: String },
  email: { type: String, unique: true, required: true },
  address: {
    house: String,
    street: String,
    postalCode: String,
    state: String,
    city: String,
  },
  contractType: { type: String },
  designation: { type: String },
  salary: { type: String },
  status: {
    type: String,
    enum: ["active", "leave", "inactive"],
    default: "inactive",
  },
  type: { type: String },
  hash: { type: String, required: true },
  workingHourAllowed: { type: String, default: "NA" },
  totalHourWorked: { type: String, default: "NA" },
  overWorkHour: { type: String, default: "NA" },
  // type: { type: String, required: true },
  phoneNumber: { type: String },
  createdDate: { type: Date, default: Date.now },
  image: { type: String },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

module.exports = mongoose.model("User", schema);
