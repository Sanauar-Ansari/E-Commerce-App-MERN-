import express from "express";
import { placeOrder } from "../controllers/orderController.js";
import { checkAuhentication } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/place-order", checkAuhentication,placeOrder);
//payment route

export default router;
