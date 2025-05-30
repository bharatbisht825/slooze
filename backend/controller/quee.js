const CheckoutQuee =require("../models/orderQuee") ;
const checkout=require("../models/checkout")
const jwt=require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');

// Generate a unique queeId

// Example: '3a0172e6-2bcf-4d1d-bc4e-d6938b98d6b1'


const addToCheckoutQuee = async (req, res) => {
  try {
    console.log("got add to quee request")
    const token=req.cookies.token
    const decoded=jwt.decode(token)
    console.log("we got the following  decode dtoken",decoded)
    const orderBy=decoded.email
    console.log("we got the following  decode dtoken",orderBy)
    const {orderFor, cart, total, address } = req.body;
    console.log("we got the following data to add in quee",orderBy,orderFor,cart,total,address)
    const queeId = uuidv4();
    const newEntry = await CheckoutQuee.create({ queeId,orderBy,orderFor,cart,total,address });
    if(newEntry){
        const deleted=await checkout.deleteOne({email:orderBy});
        console.log("deleted from checkout",deleted)
        res.status(201).json({ message: 'Added to checkout queue', data: newEntry });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to add to queue', error });
  }
};

const getCheckoutQuee = async (req, res) => {
  try {
    const token=req.cookies.token
    const decoded=jwt.decode(token)
    const role=decoded.role
    const entries = await CheckoutQuee.find();
    res.status(200).json({entries,role});
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch queue', error });
  }
};


module.exports={getCheckoutQuee,addToCheckoutQuee}