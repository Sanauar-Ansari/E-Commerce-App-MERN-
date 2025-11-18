import Product from "../models/product.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
export const addProduct=async(req,res)=>{
    const {name,description,price,offerPrice,categoty}=req.body;
    try {
        let imageUrl ="";
        
    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        folder: "products"
      });

      imageUrl = uploaded.secure_url;

      fs.unlinkSync(req.file.path); // delete temp file
    }

        const product=new Product({name,description,price,offerPrice,categoty,image:imageUrl});
        await product.save()
        res.status(201).json({message:"Product added successfully", product})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Error while adding product", error:error.message})
    }
}


export const getProducts =async(req,res)=>{
    try {
        const products=await Product.find();
         return res.status(200).json({message:"Product fetched successfully", products,success:true})
    } catch (error) {
        return res.status(500).json({message:"Error while fetching products",error,success:false})
    }
}

// for indivisual product
export const getProductById =async(req,res)=>{
 
}