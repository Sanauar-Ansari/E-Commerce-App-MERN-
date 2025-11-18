import User from "../models/user.js";


export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const user = await User.findById(userId);

    const item = user.cart.find(i => i.productId == productId);

    if (item) item.quantity += 1;
    else user.cart.push({ productId, quantity: 1 });

    await user.save();

    res.json({ message: "Added to cart", cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: "Error adding to cart" });
  }
};



export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.productId");
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to load cart" });
  }
};





export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter(i => i.productId != productId);
    await user.save();

    res.json({ message: "Item removed", cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: "Error removing item" });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const user = await User.findById(req.user.id);

    const item = user.cart.find(i => i.productId == productId);
    if (item) item.quantity = quantity;

    await user.save();

    res.json({ message: "Quantity updated", cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: "Error updating quantity" });
  }
};
