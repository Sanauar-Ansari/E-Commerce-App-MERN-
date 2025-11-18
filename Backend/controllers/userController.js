import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signup=async (req,res)=>{
    const {email,password,name}=req.body;
    const existingUser=await User.findOne({email});
  try {
      if(existingUser){
        res.status(409).json({message:"Email id already registered... Please signIn"})
    }else{
        const user=new User({email,password,name});
        await user.save();
        return res.status(201).json({message:"User created successfully",user})
    }
  } catch (error) {
         console.log(error,"Error while creating user")
         return res.status(500).json({ error:"Error while creating user"}); 
  }
}



export const signin=async (req,res)=>{
    const {email,password}=req.body;
try {
    const existingUser=await User.findOne({email});
       if(!existingUser){
        return res.status(404).json({message:"User with this emial is not found!"})
    }
    if(password===existingUser.password){
    const token= jwt.sign({id:existingUser._id},"sanauaransari",{expiresIn:"6h"});
    res.cookie('token',token,{httpOnly:true});
    return res.status(200).json({message:"SignIn successful",token,success:true })
    }else{
          return res.status(401).json({message:"Invalid password" })
    }
} catch (error) {
    return res.status(500).json({message:"Error in login",error,success:false })
}
}


export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error during logout",
      error,
      success: false,
    });
  }
};