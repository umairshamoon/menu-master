const { Schema, model } = require("mongoose");
const schema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: "users" },
  createdAt: { type: Date, default: Date.now() },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = model("Resturants", schema);
