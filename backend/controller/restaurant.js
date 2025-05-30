const { decode } = require('jsonwebtoken');
const Restaurant = require('../models/restaurant'); // adjust path if needed
const jwt=require("jsonwebtoken")
const getRestaurant = async (req, res) => {
  try {
    const token=req.cookies.token
    console.log(token)
    const decoded=jwt.decode(token)
    const role=decoded.role
    const restaurants = await Restaurant.find({ country: decoded.country });
    const simplified = restaurants.map(r => ({
      rId: r.rId,
      name: r.name
    }));

    res.status(200).json({simplified,role});
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
};

module.exports = { getRestaurant };
