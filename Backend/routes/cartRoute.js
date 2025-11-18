import express from "express"
import { addToCart, getCart, removeFromCart, updateQuantity } from "../controllers/cartController.js";
import { checkAuhentication } from "../middlewares/authMiddleware.js";

const router=express.Router();

router.get("/get-cart", checkAuhentication, getCart);
router.post("/add-to-cart", checkAuhentication, addToCart);
router.post("/remove-from-cart", checkAuhentication, removeFromCart);
router.post("/update-qty", checkAuhentication, updateQuantity);


export default router;