import jwt from "jsonwebtoken";
import config from "../config";
import Cliente from "../models/clientes.model";
import Empleado from "../models/empleados.model";
export const verifyToken=async(req,res,next)=>{
    try {
        const token=req.headers["token"];
        console.log(token);
        if(!token) return res.status(403).json({message:"No token provider"});
        const decode=jwt.verify(token,config.secret);
        console.log(decode);
        const cliente=await Cliente.findOne({_id:decode._id,correo:decode.correo},{_id:1});
        console.log(cliente);
        if(!cliente) return res.status(403).json({message:"No token provider"});
        next();  
    } catch (error) {
        return res.status(401).json({message:"No authorization"});
    }
    
}

export const verifyTokenEmpleado=async(req,res,next)=>{
    try {
        const token=req.headers["token"];
        if(!token) return res.status(403).json({message:"No token provider"});
        const decode=jwt.verify(token,config.superscret);
        const cliente=await Empleado.findOne({_id:decode._id,correo:decode.correo},{_id:1});
        if(!cliente) return res.status(403).json({message:"No token provider"});
        next();  
    } catch (error) {
        
        return res.status(401).json({message:"No authorization"});
    }
    
}

export const EmpleadoIsAdmin=async(req,res,next)=>{
    try {
        const token=req.headers["token"];
        if(!token) return res.status(403).json({message:"No token provider"});
        const decode=jwt.verify(token,config.superscret);
        if(decode.tipo=="admin") next();  
        else return res.status(403).json({message:"No authorization"});
    } catch (error) {
        return res.status(401).json({message:"No authorization"});
    }
    
}

export const EmpleadoIsGerente=async(req,res,next)=>{
    try {
        const token=req.headers["token"];
        if(!token) return res.status(403).json({message:"No token provider"});
        const decode=jwt.verify(token,config.superscret);
        if(decode.tipo=="gerente" || decode.tipo=="admin") next();  
        else return res.status(403).json({message:"No authorization"});
    } catch (error) {
        return res.status(401).json({message:"No authorization"});
    }
    
}