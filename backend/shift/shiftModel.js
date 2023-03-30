const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: { type: String },
  day: { type: String },
  from: { type: String },
  to: { type: String },
  employees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  addedBy: { type: Schema.Types.ObjectId, ref: "User" },
  lastUpdatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  lastUpdatedAt: { type: Date, default: Date.now() },
  createdDate: { type: Date, default: Date.now() },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

module.exports = model("Shift", schema);
