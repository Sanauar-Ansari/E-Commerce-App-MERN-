import mongoose from "mongoose";

const paymentSchema=new mongoose.Schema({
    orderId:{type:mongoose.Schema.Types.ObjectId,ref:"orderabc",require:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",require:true},


    
  razorpayOrderId:{type:String},
  razorpayPaymentId:{type:String},
  razorpaySignature:{type:String},


  attemptNumber:{type:Number,default:1},

  
  status: {type: String,enum: ["created", "success", "failed"],default: "created"},

  amount:{type:Number},  // store snapshot
  currency:{type:String},

  failureReason: {type:String},
  rawResponse: {},   // full razorpay response (optional)

  createdAt: { type: Date, default: Date.now }

});

const Payment=mongoose.model("Payment",paymentSchema);
export default Payment;