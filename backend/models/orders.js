const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  clientEmail: {
    type: String,
    required: true
  },
  cart: {
    type: Object,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
