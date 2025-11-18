import jwt from "jsonwebtoken";
import User from "../models/user.js";
export const checkAuhentication=(req,res,next)=>{
  // Get token from Authorization header
  let token = null;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]; // extract token after "Bearer "
  }

  if (!token) {
    return res.status(401).json({ error: "Unauthorized, please login again..." });
  }

  // Verify token
  jwt.verify(token,"sanauaransari", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Forbidden" });
    }    
    req.user = decoded; // attach decoded info to request
    // console.log(req.userId,"req.user decod")
    //    console.log(req.userId.id,"req.user decod")
    next();
  });



  // const {token}=req.cookies;
  // if(!token){
  //   return res.json({success:false,message:"Not Authorized"})
  // }

  // try {
  //    jwt.verify(token,"sanauaransari", (err, decoded) => {
  //   if (err) {
  //     return res.status(401).json({ error: "Forbidden" });
  //   }    
  //   req.userId = decoded; // attach decoded info to request
  //   next();
  // });
  // } catch (error) {
  //   res.json({success:false,message:error})
  // }
 
}

