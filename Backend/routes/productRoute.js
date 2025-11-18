import  express from "express";
import { addProduct ,getProducts} from "../controllers/productController.js";
import { checkAuhentication } from "../middlewares/authMiddleware.js";
import  upload  from "../config/multer.js";

const router=express.Router();

router.post("/add-product",upload.single("image"),addProduct);
router.get("/fetch-product",checkAuhentication,getProducts);



export default router;