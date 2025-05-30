const mongoose = require('mongoose');

const checkoutQueueSchema = new mongoose.Schema({
  queeId: { type: String, required: true,unique:true },
  orderBy: { type: String, required: true }, 
  orderFor: { type: String, required: true },
  cart: { type: Object, required: true },
  total: { type: Number, required: true },
  address: { type: String, required: true }
}, { timestamps: true });

const CheckoutQueue = mongoose.model('CheckoutQueue', checkoutQueueSchema);

module.exports = CheckoutQueue;
