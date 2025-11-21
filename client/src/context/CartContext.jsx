import { createContext, useEffect, useState } from "react";
import axios from "axios";
// import dotenv from "dotenv"
// dotenv.config();

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from backend on refresh
  useEffect(() => {
    loadCartFromDB();
  }, []);

  const loadCartFromDB = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/get-cart`,    { withCredentials: true }
      );
      // console.log(res,"response at cart ")
      setCart(res.data);
    } catch (err) {
      console.log("Cart fetch failed", err);
    }
  };


  // console.log(cart.length,"iiiiiiiiiiiiiiii")
  const addToCart = async (productId) => {
    try {
    const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/add-to-cart`,
        { productId },    { withCredentials: true }
      );

      // if(cart.length>=4){
      //  return alert("Cant added more");
      // }

      loadCartFromDB();
    } catch (err) {
      console.log("Add to cart failed", err);
    }
  };

  const updateQty = async (productId, quantity) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/update-qty`,
        { productId, quantity },    { withCredentials: true }
      );
      loadCartFromDB();
    } catch (err) {
      console.log("Quantity update failed", err.response?.data);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/remove-from-cart`,
        { productId },    { withCredentials: true }
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
