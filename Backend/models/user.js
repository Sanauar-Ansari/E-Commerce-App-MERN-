import express from "express";
import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 }
    }
  ]
},{timestamps: true})

const User=mongoose.model("User",userSchema);

export default User;

// by default it is "minimize:true"===> basically this is called minimization.
//  it means mongoose removed whatever we will add empty so we have to tell mongoose "minimize:false"