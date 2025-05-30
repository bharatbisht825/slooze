const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'member'],
    required: true,

  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  password:{
    type:String,
    required:true
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
