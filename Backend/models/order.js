import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  // jhjhjh
  address: {
    fullName: String,
    mobile: String,
    houseNo: String,
    street: String,
    city: String,
    pincode: String
  },
  totalAmount:{type:Number},
  //These two will help to find all placed order who's payment="success" OR status="placed" 
  status: { type: String, default: "created" },  // created, paid, failed
  razorpayOrderId:{type:String},   // razorpay order id (r_order_xxx)
  razorpayPaymentId: {type:String}, // razorpay payment id after successful pay
  razorpaySignature: {type:String}, // signature returned by razorpay (optional store)
  createdAt: { type: Date, default: Date.now },

// added this payment schema to order.
  payments: [
   { type: mongoose.Schema.Types.ObjectId, ref: "Payment" }
],
});



const Order=mongoose.model('orderabc',orderSchema);  
export default Order;