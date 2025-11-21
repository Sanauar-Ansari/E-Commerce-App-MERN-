import  express from "express";
import { checkAuhentication } from "../middlewares/authMiddleware.js";
import { createRazorpayOrder, verifyPayment ,paymentWebhook } from "../controllers/paymentController.js";

const router=express.Router();

router.post("/create-order", checkAuhentication, createRazorpayOrder);
router.post("/verify-payment", checkAuhentication, verifyPayment);
router.post("/webhook", express.json({ type: "*/*" }), paymentWebhook);


export default router;