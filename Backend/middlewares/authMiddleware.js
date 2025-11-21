import jwt from "jsonwebtoken";
import User from "../models/user.js";
export const checkAuhentication=(req,res,next)=>{
  // Get token from Authorization header
  // let token = null;
  // const authHeader = req.headers.authorization;

  // if (authHeader && authHeader.startsWith("Bearer ")) {
  //   token = authHeader.split(" ")[1]; // extract token after "Bearer "
  // }

  // if (!token) {
  //   return res.status(401).json({ error: "Unauthorized, please login again..." });
  // }


  const token=req?.cookies?.token;
    if (!token) {
    return res.status(401).json({ error: "Unauthorized. Please login." });
  }

  // Verify token
  jwt.verify(token,"sanauaransari", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid or expired token." });
    }    
    req.user = decoded; // attach decoded info to request
    next();
  });
}

