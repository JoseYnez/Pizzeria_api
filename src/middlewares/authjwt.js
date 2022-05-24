import jwt from "jsonwebtoken";
import config from "../config";
import Cliente from "../models/clientes.model";
export const verifyToken=async(req,res,next)=>{
    try {
        const token=req.headers["x-access-token"];
        console.log(token);
        if(!token) return res.status(403).json({message:"No token provider"});
        const decode=jwt.verify(token,config.secret);
        console.log(decode);
        const cliente=await Cliente.findOne({_id:decode._id,correo:decode.correo},{_id:1});
        console.log(cliente);
        if(!cliente) return res.status(403).json({message:"No token provider"});
        next();  
    } catch (error) {
        return res.status(403).json({message:"No authorization"});
    }
    
}