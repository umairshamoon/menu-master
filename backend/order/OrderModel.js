const { Schema, model } = require('mongoose')
const schema = new Schema({
  details: [
    {
      recpieId: { type: Schema.Types.ObjectId, ref: 'Recipes' },
      quantity: { type: Number, default: 1 },
      additionalDetails: { type: String },
    },
  ],
  createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: Date.now() },
  status: {
    type: String,
    enum: ['pending', 'complete', 'cancelled'],
    default: 'pending',
  },
  flag: { type: Boolean, default: true },
})
schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.hash
  },
})

module.exports = model('Order', schema)
