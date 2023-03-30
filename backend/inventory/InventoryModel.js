const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  itemName: { type: String },
  units: [
    {
      unit: String,
      quantity: Number,
      expireDate: Date,
      days: Number,
      fixed: Number,
      isOpened: { type: Boolean, default: false },
    },
  ],

  description: { type: String },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lastUpdatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  lastUpdatedAt: { type: Date, default: Date.now() },
  images: { type: Array },
  createdDate: { type: Date, default: Date.now() },
})

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.hash
  },
})

module.exports = mongoose.model('Inventory', schema)
