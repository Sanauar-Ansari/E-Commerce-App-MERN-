import mongoose from "mongoose";

const addressSchema=new mongoose.Schema({
    userId:{type:String,require:true,ref:'user'},
    street:{type:String},
    city:{type:String},
    pincode:{type:Number}

},{timestamps:true});

const Address=mongoose.model('address',addressSchema);
export default Address;