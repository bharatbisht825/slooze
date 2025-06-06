const mongoose = require('mongoose');

const checkoutQueueSchema = new mongoose.Schema({
  userCountry:{type:String,required:false},
  queeId: { type: String, required: false, },
  orderBy: { type: String, required: true }, 
  orderFor: { type: String, required: true },
  cart: { type: Object, required: true },
  total: { type: Number, required: true },
  address: { type: String, required: true }
}, { timestamps: true });

const CheckoutQueue = mongoose.model('CheckoutQueue', checkoutQueueSchema);

module.exports = CheckoutQueue;
