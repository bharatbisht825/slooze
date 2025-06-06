const order=require("../models/orders")
const { decode } = require('jsonwebtoken');
const jwt=require("jsonwebtoken")
const checkout=require("../models/checkout")
const checkoutQuee=require("../models/orderQuee");
const { json } = require("express");

const submitOrder=async(req,res)=>{
    const token=req.cookies.token
    const {paymentMethod,total,to}=req.body
    const decoded=jwt.decode(token)
    const email=decoded.email
    const checkoutData= await checkout.findOne({email}) 
    if(checkoutData){
        const ordered= await order.create({
            country:decoded.country,
            clientEmail:to,
            cart:checkoutData.cart,
            paymentMethod,
        }
        ) 
        if(ordered){
            const deleted=await checkout.deleteOne({email});
            console.log("we have sucesfully deleted from checkout",deleted)
        }
        else{
            console.log("unable to create orders")
        }

    }
    else{
        console.log("there is no data in checkout cart")
        res.status(401)
    }
    
}

const submitOrderQuee=async(req,res)=>{
    const token=req.cookies.token
    const {queeId,paymentMethod}=req.body
    console.log("got the following data form orderQuee",queeId,paymentMethod)
    const decoded=jwt.decode(token)
    const queeData= await checkoutQuee.findOne({queeId}) 
    if(queeData){
        const ordered= await order.create({
            country:decoded.country,
            clientEmail:queeData.orderFor,
            cart:queeData.cart,
            paymentMethod,
        }
        ) 
        if(ordered){
            const deletedQuee=await checkoutQuee.deleteOne({queeId});
            console.log("we have sucesfully deleted from checkoutQuee",deletedQuee)
            res.status(200)
        }
        else{
            console.log("unable to create  orders from checkoutQuee")
        }

    }
    else{
        console.log("there is no data in checkoutQuee cart")
        res.status(401)
    }
    
}

const getOrders=async(req,res)=>{
    const token=req.cookies.token
    const decoded=jwt.decode(token)
    const role=decoded.role
    const orderData= await order.find({country:decoded.country})
    console.log(orderData)
    res.status(200).json({orderData,role})

}

const delOrders=async(req,res)=>{
    const _id=req.body
    const deletedOrder=await order.deleteOne({_id});
    console.log("we have deleted the follwing order",deletedOrder)
    if(deletedOrder){
            res.status(200).json(deletedOrder)
    }

}

module.exports={submitOrder,submitOrderQuee,getOrders,delOrders}