import Address from "../models/address.js";


export const addAddress=async(req,res)=>{
    try {
         const{userId,street,city,pincode}=req.body;
         const address=await new Address({userId,street,city,pincode}) 
         await address.save();
         res.status(201).json({success:true,message:"Address added successfully"})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}


export const getAddress=async(req,res)=>{
    try {
         const{userId}=req.body;
         const address=await Address.find({userId});
         res.status(201).json({success:true,message:"Address added successfully",address})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}