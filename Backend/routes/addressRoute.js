import express from "express"
import { checkAuhentication } from "../middlewares/authMiddleware.js";
import { addAddress, getAddress } from "../controllers/addressController.js";

const router=express.Router();

router.post("/add-address",checkAuhentication,addAddress);
router.get("/get-address",checkAuhentication,getAddress);


export default router;