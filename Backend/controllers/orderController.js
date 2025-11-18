import Order from "../models/order.js";
import User from "../models/user.js";

export const placeOrder = async (req, res) => {
  try {
    const { address } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = user.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order({
      userId:user._id,
      items: user.cart,
      address,
      totalAmount,
    });

    // Empty user cart after placing order
    user.cart = [];
    await user.save();

    return res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error placing order",
      error: error.message,
    });
  }
};
