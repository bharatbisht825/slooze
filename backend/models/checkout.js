const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  cart: {
    type: Object,
    required: true
  }
}, {
  timestamps: true
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
