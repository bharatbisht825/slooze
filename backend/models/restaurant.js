const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  rId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  dishes: {
    type: [Object],
    default: []
  }
}, {
  timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
