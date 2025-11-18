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
  address: {
    fullName: String,
    mobile: String,
    houseNo: String,
    street: String,
    city: String,
    pincode: String
  },
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now }
});



const Order=mongoose.model('order',orderSchema);  
export default Order;