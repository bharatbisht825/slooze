const user=require("../models/user")
const jwt=require("jsonwebtoken")
const Restaurant =require("../models/restaurant")

async function createUser(req,res){
    const {name,email,password,role,country}=req.body
    const messageBody={}
    if(await user.findOne({email})){
        res.status(200).json(error="user already exist")
    }
    else{
        // hash the password and store it 
        try {
            const createdUser= await user.create({
                email,
                password,
                name,
                role,
                country
            })
            if(createdUser){
                res.status(200).json(messageBody.message="User is sucessfully Created")
            }
        } catch (error) {
            console.log("the following error has occured while creating the user in db"+error)
        }
    }
}


async function loginUser(req,res) {
    const {email,password}=req.body
    if(!email || !password){
        return
    }
    userData=await user.findOne({email})
    if(!userData){
        res.status(200).json({error:"email does not exist"})
    }
    else{
        // hash the password and store it 
        try {
            if(userData.password==password){
                const token=jwt.sign({email:userData.email,role:userData.role,country:userData.country},"bharat",{expiresIn:"5h"})
                res.cookie("token",token,{httpOnly:true,secure: true}).status(200).json({"message":"Verified and cookie sent"})
                console.log("the sent to token is ",token)
                console.log("the decodeded token is ",jwt.decode(token))
            }
            else{
                res.status(401).json({error:"Invalid Credentials"})            }
        } catch (error) {
           
            console.log("the following error has occured while verifying the user in db"+error)
        }
    }



}

module.exports={createUser,loginUser}
