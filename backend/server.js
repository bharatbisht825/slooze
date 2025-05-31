const express= require("express")
const cors =require("cors")
require("dotenv").config()
const connectDb=require("./db")
const cookieParser=require("cookie-parser")
const { createUser, loginUser } = require("./controller/user")
const { getRestaurant } = require("./controller/restaurant")
const { getDishes } = require("./controller/dishes")
const { addCart, removeCart, getCart } = require("./controller/checkout")
const { submitOrder, submitOrderQuee, getOrders, delOrders } = require("./controller/order")
const { addToCheckoutQuee, getCheckoutQuee } = require("./controller/quee")
const authToken = require("./middleware/auth")
const PORT = process.env.PORT || 5000;
const app=express()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true, // 👈 important: allows cookies to be sent
}));
app.use(cookieParser())
connectDb();


app.get("/",(req,res)=>{
    res.send("hey")
})

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})

app.post("/login",loginUser)
app.post("/register",createUser)
app.get('/restaurant',authToken,getRestaurant)
app.get("/getDishes/:id",authToken,getDishes)
app.post("/addCart",authToken,addCart)
app.post("/delCart",authToken,removeCart)
app.get("/getCart",authToken,getCart)
app.post("/order",authToken,submitOrder)
app.post("/orderQuee",authToken,submitOrderQuee)
app.post("/addQuee",authToken,addToCheckoutQuee)
app.get("/getQuee",authToken,getCheckoutQuee)
app.get("/getOrder",authToken,getOrders)
app.post("/delOrder",authToken,delOrders)