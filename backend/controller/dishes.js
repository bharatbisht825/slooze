const { decode } = require('jsonwebtoken');
const Restaurant = require('../models/restaurant'); // adjust path if needed
const jwt=require("jsonwebtoken")
const checkout=require("../models/checkout")

const getDishes = async (req, res) => {

  try {
    const token=req.cookies.token
    console.log(token)
    const decoded=jwt.decode(token)
    const rId=req.params.id

    console.log(rId)
    const dishQtyMap= new Map()
    const restaurants = await Restaurant.findOne({ rId }); // getting all dishes
    const simplified = restaurants.dishes;
    const checkoutData= await checkout.findOne({email:decoded.email}) // getting dishes in cart
    if(checkoutData){
        console.log(typeof(checkoutData.cart[rId]))
        if(checkoutData.cart[rId]){
            checkoutData.cart[rId].map((dish,ind)=>dishQtyMap.set(dish.dID,dish.qty))
        }
    }

    const dishData=simplified.map((dish,ind)=>{
        if(dishQtyMap.has(dish.dID)){
             console.log("i have dish",dish.dID,"qty",dishQtyMap.get(dish.dID))
            return {rId:rId,dId:dish.dID,name:dish.name,price:dish.price,qty:dishQtyMap.get(dish.dID)}
        }
        else{
            return {rId:rId,dId:dish.dID,name:dish.name,price:dish.price,qty:0}
        }
    })

    res.status(200).json(dishData);
  } catch (error) {
    console.error('Error fetching dishes:', error);
    res.status(500).json({ error: 'Failed to fetch dishes' });
  }


};

module.exports = { getDishes };
