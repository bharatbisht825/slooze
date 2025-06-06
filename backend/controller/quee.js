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
    const userCountry=decoded.country;
    console.log("we got the following  decode dtoken",decoded)
    const orderBy=decoded.email
    console.log("we got the following  decode dtoken",orderBy)
    const {orderFor, cart, total, address } = req.body;
    console.log("we got the following data to add in quee",orderBy,orderFor,cart,total,address)
    const queeData= await CheckoutQuee.findOne({userCountry})
    if(queeData){
       const countryCart=queeData.cart;
             console.log("quee data with country found",countryCart)
             console.log("done")

       const oldMap = new Map();
        countryCart.forEach(item => oldMap.set(item.dID, item));
        cart.forEach(newItem => {
          if (oldMap.has(newItem.dID)) {
            oldMap.get(newItem.dID).qty += newItem.qty;
          } else {
            countryCart.push(newItem);
            oldMap.set(newItem.dID, newItem);
          }
        });

        console.log(countryCart);
        queeData.cart=countryCart
        queeData.markModified('cart');

        const finalData= await queeData.save()
        console.log(finalData)
        if(finalData){
           const deleted=await checkout.deleteOne({email:orderBy});
          console.log("deleted from checkout",deleted)
          res.status(200).json({message:"sucessfully inserted in cart"})
        }
          }

    else{
      const queeId = uuidv4();
      console.log("creating a completely new quee by country")
      const newEntry = await CheckoutQuee.create({ userCountry,queeId,orderBy,orderFor,cart,total,address });
      if(newEntry){
        const deleted=await checkout.deleteOne({email:orderBy});
        console.log("deleted from checkout",deleted)
        res.status(200).json({message:"sucessfully inserted in cart"})
      }   
  }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to add to queue', error });
  }
};

const getCheckoutQuee = async (req, res) => {
  try {
    console.log("getting the quee")
    const token=req.cookies.token
    const decoded=jwt.decode(token)
    const role=decoded.role
    
    const entries = await CheckoutQuee.findOne({userCountry:decoded.country});
    console.log(entries)
    res.status(200).json({entries,role});
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch queue', error });
  }
};


module.exports={getCheckoutQuee,addToCheckoutQuee}