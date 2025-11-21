import express from "express";
const app=express();
import "./config/mongoose.js"
import  "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRoutes from "./routes/orderRoute.js"
import reportRoutes from "./routes/reportRoute.js"
import paymentRoutes from "./routes/paymentRoute.js"

import cors from "cors"
import cookieParser from "cookie-parser";

const port =3000;


// CORS
const allowedOrigins = 'http://localhost:5173';
app.use(cors({origin:allowedOrigins, credentials: true}))
// when Frontend send data in json then we have to parse it 
app.use(express.json());
// parse the cookie
app.use(cookieParser());


//Routes
app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order", orderRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/payment", paymentRoutes);




app.get("/",(req,res)=>{
    res.send("welcome to ecomm")
})

app.listen(port,(err)=>{
    if(err){
        console.log("There is an error while running server",err)
    }else{
        console.log("Server successfully running on port: ",port)
    }
})