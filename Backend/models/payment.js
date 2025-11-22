import mongoose from "mongoose";

const paymentSchema=new mongoose.Schema({

},{timestamps:true});


const Payment=mongoose.model("Payment",paymentSchema);