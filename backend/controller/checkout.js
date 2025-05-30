const { decode } = require('jsonwebtoken');
const jwt=require("jsonwebtoken")
const checkout=require("../models/checkout")

const addCart = async (req, res) => {
    
  try {
    const token=req.cookies.token
    const {rId,dId,name,price,qty}=req.body
    console.log("The following is the data recieved for card addition",rId,dId,name,price,qty)
    console.log("the user has the following token",token);
    const decoded=jwt.decode(token)
    const email=decoded.email
    console.log("the user token as following email",email)
    const checkoutData= await checkout.findOne({email}) // getting dishes in cart
    if(checkoutData){ // if the user has a chekout cart
        console.log(typeof(checkoutData.cart[rId]))
        console.log("the user has email in checkout ",checkoutData)
        let foundDish=false
        if(checkoutData.cart[rId]){  //if there is a restaurant in card already
            console.log("the user has already added dishes from restraunt",checkoutData.cart[rId])
            const dishar=checkoutData.cart[rId].map((dish,ind)=>{
                if(dish.dID==dId){  // if the dish is already in cart
                    foundDish=true
                    console.log("we are just updating previous quantity")
                    return{
                        dID:dId,name:name,price:price,qty:qty 
                    }
                
                }else{
                    return dish
                }
            })
            if(!foundDish){ // if the dish not in cart already
                console.log("new dish is added from the user for rId")
                dishar.push({dID:dId,name:name,price:price,qty:qty})
            }
            checkoutData.cart[rId]=dishar
            checkoutData.markModified('cart');
            const newdata= await checkoutData.save()
            console.log(newdata)
        }else{ // if there is no rId in cart at all
            console.log("new restaurant is added by the user with new cart dishes")
            checkoutData.cart[rId]=[{dID:dId,name:name,price:price,qty:qty}]
            checkoutData.markModified('cart');
            await checkoutData.save()
        }

    }else{ //if there is no cart at all 
        console.log("we are creating completely new cart for the user")
        const newInsert=await checkout.create({
            email:email,
            cart:{
                [rId]:[{dID:dId,name:name,price:price,qty:qty}]
            }
        })
        if(newInsert){
            console.log("new cart item inserted",newInsert)
        }
    }

    res.status(200)
  } catch (error) {
    console.error('Error added to checkout:', error);
    res.status(500).json({ error: 'Failed to add to checkout' });
  }


};



const removeCart = async (req, res) => {
    
  try {
    const token=req.cookies.token
    const {rId,dId,name,price,qty}=req.body
    console.log("The following is the data recieved for card addition",rId,dId,name,price,qty)
    console.log("the user has the following token",token);
    const decoded=jwt.decode(token)
    const email=decoded.email
    console.log("the user token as following email",email)
    const checkoutData= await checkout.findOne({email}) // getting dishes in cart
    if(qty>0){
        console.log("qty is > 0")
        console.log("the user checkout Cart ",checkoutData)
        console.log("the user has already added dishes from restraunt",checkoutData.cart[rId])
        const dishar=checkoutData.cart[rId].map((dish,ind)=>{
                if(dish.dID==dId){  // if the dish is already in cart
                    console.log("we are just updating previous quantity")
                    return{
                        dID:dId,name:name,price:price,qty:qty 
                    }
                
                }else{
                    return dish
                }
            })
            checkoutData.cart[rId]=dishar
            checkoutData.markModified('cart');
            const newdata= await checkoutData.save()
            console.log(newdata)

    }else if(qty==0){
            // grab dishes with particular rId
            
            const dishar=checkoutData.cart[rId]
            if(dishar.length==1){ // if only one dish is there
                console.log("we found only one dish for a rID",rId)
                delete checkoutData.cart[rId];
                checkoutData.markModified('cart');
                await checkoutData.save();

            }
            else{
                const filteredCart=checkoutData.cart[rId].filter((dish,ind)=>dish.dID!=dId)
                checkoutData.cart[rId]=filteredCart
                checkoutData.markModified('cart');
                const newdata= await checkoutData.save()
                console.log("we have sucessfully removed disheh from dish array",newdata)
            }
    }
    

    res.status(200)
  } catch (error) {
    console.error('Error remove to checkout:', error);
    res.status(500).json({ error: 'Failed to remove to checkout' });
  }


}


const getCart= async (req,res)=>{
    const token=req.cookies.token
    console.log("the user has the following token",token);
    const decoded=jwt.decode(token)
    const role=decoded.role
    const email=decoded.email
    const checkoutData= await checkout.findOne({email}) // getting dishes in cart
    if(checkoutData){
        const result = Object.entries(checkoutData.cart).flatMap(([rId, items]) =>
  items.map(item => ({ ...item, rId }))
);
        console.log("sending the following data to the checkout frontend",result)
        res.status(200).json({result,role})
    }

}

module.exports = { addCart ,removeCart,getCart};
