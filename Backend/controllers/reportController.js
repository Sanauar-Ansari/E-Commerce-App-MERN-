import Order from "../models/order.js";
import Product from "../models/product.js"


export const allProductReport=async(req,res)=>{
   try {
    const product=await Product.find();
     return res.status(200).json({message:"Fetched successfully",product,success:true})
   } catch (error) {
    return res.status(500).json({message:"Error while Fetching product list",error,success:false})
   }
}


// for loged in users only
export const getAllPlacedOrderReport=async(req,res)=>{
   try {
    const userId=req.user.id;
    console.log(userId)
    //  Order.findById(userId)===>>>> this is wrong becoz findById is used for order._id 
    const product=await Order.find({userId}).populate("items.productId");
    res.status(200).json({message:"List of all placed order found",product,success:true})
   } catch (error) {
    res.status(500).json({message:"Error to find all placed order",error,success:false})
   }
}


export const getAllPlacedOrderReportWithouUser=async(req,res)=>{
   try {
    // if there is not status:"placed" then we can not find for all users. 
    const product=await Order.find({status:"placed"}).populate("items.productId").populate("userId","name  email");
    res.status(200).json({message:"List of all placed order found",product,success:true})
   } catch (error) {
    res.status(500).json({message:"Error to find all placed order",error,success:false})
   }
}