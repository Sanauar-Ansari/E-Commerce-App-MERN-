import express from "express";
import { allProductReport, getAllPlacedOrderReport,getAllPlacedOrderReportWithouUser } from "../controllers/reportController.js";
import { checkAuhentication } from "../middlewares/authMiddleware.js";

const router=express.Router();

router.get("/get-all-product-report",allProductReport);
router.get("/get-all-placed-order-report",checkAuhentication,getAllPlacedOrderReport);
router.get("/get-all-placed-order-withou-user-report",getAllPlacedOrderReportWithouUser);




export default router;