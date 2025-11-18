import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from backend on refresh
  useEffect(() => {
    loadCartFromDB();
  }, []);

  const loadCartFromDB = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:3000/api/cart/get-cart",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log(res,"response at cart ")
      setCart(res.data);
    } catch (err) {
      console.log("Cart fetch failed", err);
    }
  };

  const addToCart = async (productId) => {
    try {
         const token = localStorage.getItem("token");
    const res=await axios.post("http://localhost:3000/api/cart/add-to-cart",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      loadCartFromDB();
    } catch (err) {
      console.log("Add to cart failed", err);
    }
  };

  const updateQty = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api/cart/update-qty",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      loadCartFromDB();
    } catch (err) {
      console.log("Quantity update failed", err.response?.data);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api/cart/remove-from-cart",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      loadCartFromDB();
    } catch (err) {
      console.log("Remove failed", err.response?.data);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
