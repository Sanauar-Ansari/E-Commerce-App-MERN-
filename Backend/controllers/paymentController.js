
import Razorpay from "razorpay"
import Order from "../models/order.js";
import User from "../models/user.js";
import crypto from "crypto";
export const createRazorpayOrder=async(req,res)=>{
    var razorpay = new Razorpay({ key_id: 'rzp_test_RhuhcDCND55vs5', key_secret: 'ZD4e2WLNEXMwOqkuUo58pwen' })
try {
    const {address } = req.body;
    const userId = req.user.id; // from auth middleware

 const user = await User.findById(req.user.id).populate("cart.productId");
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
      // Correct calculation
    const totalAmount = user.cart.reduce(
      (sum, item) => sum + item.productId.offerPrice * item.quantity,
      0
    );

        // 1) Create new order entry in MongoDB with status = "created"
    const newOrder = await Order.create({
      userId:user._id,
      items:user.cart,
      address,
      totalAmount,
      status: "created"
    });

    // Empty cart after placing order
    // user.cart = [];
    await user.save();


     // 2) Initialize Razorpay instance
    var razorpay = new Razorpay({ key_id: 'rzp_test_RhuhcDCND55vs5', key_secret: 'ZD4e2WLNEXMwOqkuUo58pwen' })

      // 3) Create Razorpay Order
    const options = {
      amount: totalAmount*100, // amount in paise
      currency: "INR",
      receipt: `order_rcptid_${newOrder._id}`
    };

    const rzpOrder = await razorpay.orders.create(options);

      // 4) Save razorpayOrderId inside database
    newOrder.razorpayOrderId = rzpOrder.id;
    await newOrder.save();

    res.status(200).json({
      success: true,
      message: "Razorpay order created",
      orderId: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      dbOrder: newOrder
    });
} catch (error) {
    res.status(500).json({ success: false, message: "Error creating Razorpay order", error });
}
}



export const verifyPayment=async(req,res)=>{
try {
    console.log(req.user.id,"iddddddddd");
     const user = await User.findById(req.user.id).populate("cart.productId");
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
    console.log("razorpay_order_id", razorpay_order_id,razorpay_payment_id,razorpay_signature)
    // 1) Generate expected signature
    const sign = crypto
      .createHmac("sha256","ZD4e2WLNEXMwOqkuUo58pwen")
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    // 2) Compare signatures
    if (sign !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    // 3) Update order in DB
    const updatedOrder = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        status: "paid",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature
      },
      { new: true }
    );
     // Empty cart after payment verification done.
    user.cart = [];
    await user.save();
    res.status(200).json({success: true,message: "Payment verified successfully",updatedOrder});
} catch (error) {
      res.status(500).json({ success: false, message: "Verification error", error });  
}



}