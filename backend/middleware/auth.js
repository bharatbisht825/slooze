const jwt=require("jsonwebtoken")

async function authToken(req,res,next){

    try {
            const token=req.cookies.token
            console.log(token)
            const decoded=jwt.verify(token,"bharat")
            console.log(decoded)
            if(decoded){
                console.log("Token is verifed")
                res.status(200)
                next()
            }

    } catch (error) {
        console.log("There is an error in decoding the ",error)
        res.status(401).json({error:"token is not verified"})
        
    }
}

module.exports=authToken