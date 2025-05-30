const mongoose=require("mongoose")

async function connectDb(){
    try {
        const connection=await mongoose.connect(process.env.CONNECTION_URI)
        if(connection){
            console.log("connected to db")
        }
    } catch (error) {
        console.log("db error " + error)
    }
   

}

module.exports=connectDb