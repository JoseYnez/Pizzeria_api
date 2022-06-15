import Empleado from "../models/empleados.model";
import { Schema,Types} from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config"

export const getEmpleados=async (req,res)=>{
    try {
        const empleados=await Empleado.find({},{passwd:0});
        res.status(200).json(empleados);
    } catch (error) {
        res.status(404).json(null);
    }
}

export const getEmpleadoById=async (req,res)=>{
    try {
        const empleado=await Empleado.findById(req.params.id,{passwd:0});
        res.status(200).json(empleado);
    } catch (error) {
        res.status(404).json(null);
    }
    
}

export const getEmpleado=async (req,res)=>{
    try {
        const token=req.headers["token"];
        const decode=jwt.verify(token,config.superscret);
        const empleado=await Empleado.findById(decode._id,{passwd:0,historial:0});
        res.status(200).json(empleado);
    } catch (error) {
        res.status(404).json(null);
    }
    
}

export const getEmpleadoBySucursal=async (req,res)=>{
    try {
        let empleados
        let tipo=req.body.tipos.length;
        let sucursal=req.body.sucursales.length
        if(sucursal>0 && tipo>0)empleados=await Empleado.find({id_sucursal:{$in:req.body.sucursales},tipo:{$in:req.body.tipos}},{passwd:0});
        else if(sucursal>0 && tipo==0)empleados=await Empleado.find({id_sucursal:{$in:req.body.sucursales}},{passwd:0});
        else if(sucursal==0 && tipo>0)empleados=await Empleado.find({tipo:{$in:req.body.tipos}},{passwd:0});
        else empleados=await Empleado.find({},{passwd:0});
        res.status(200).json(empleados);
    } catch (error) {
        console.log(error)
        res.status(404).json();
    }
    
}

export const createEmpleado=async (req,res)=>{
    try {
        const historial1={activo:true,razon:"Contratacion",fecha:new Date()};
        const {nombre,apepat,apemat,edad,telefono,correo,curp,passwd,direccion,id_sucursal}=req.body;
        const empleado=new Empleado({nombre,apepat,apemat,edad,telefono,correo,curp,passwd:await Empleado.ecryptPasswd(passwd),direccion,id_sucursal});
        empleado.historial.push(historial1);
        await empleado.save();
        res.status(201).json();
    } catch (error) {
        console.log(error)
        res.status(404).json();
    }
}

export const updateEmpleadoAdmin=async (req,res)=>{
    try {
        const empleado=await Empleado.findByIdAndUpdate(req.body._id,req.body,{new:true});
        if (empleado!=null)res.status(201).json(empleado);
        else res.status(404).json();
    } catch (error) {
        res.status(404).json();
        console.log
    }
    
}

export const updateEmpleado=async (req,res)=>{
    const token=req.headers["token"];
    const decode=jwt.verify(token,config.superscret);
    if(req.body._id==decode._id){
    const empleado=await Empleado.findByIdAndUpdate(req.body._id,req.body,{new:true});
    if (empleado!=null)res.status(201).json(empleado);
    else res.status(404).json(null);}
    else res.status(401).json(null);
}

export const changePassword=async (req,res)=>{
    try {
        const token=req.headers["token"];
        const decode=jwt.verify(token,config.superscret);
        if(req.body._id==decode._id){
        const empleadoFound=await Empleado.findOne({_id:req.body._id},{_id:1,passwd:1});
        if(!empleadoFound) return res.status(404).json(null);
        const matchPasswd=await Empleado.comparePasswd(req.body.passwd,empleadoFound.passwd);
        if(!matchPasswd) return res.status(401).json(null);
        else {
            const empleado=await Empleado.findByIdAndUpdate(req.body._id,{passwd:await Empleado.ecryptPasswd(req.body.passwdn)},{new:true});
            if (empleado!=null)res.status(201).json();
            else res.status(404).json();
    }}
    else res.status(401).json(null);
    } catch (error) {
        res.status(401).json(null);
    }
    

}



export const updateEmpleadoStatus=async (req,res)=>{
    try {
        const historial1={activo:req.body.activo,razon:req.body.razon,fecha:new Date()};
        const activo=await Empleado.find({_id:req.body._id},{activo:1});
        if(activo[0].activo!=req.body.activo){
            const empleado=await Empleado.findByIdAndUpdate(req.body._id,{activo:req.body.activo,$push:{historial:historial1}},{new:true});
            if (empleado!=null)res.status(201).json(empleado);
            else res.status(404).json();}
        else res.status(404).json(null);
    } catch (error) {
        res.status(404).json(null);
    }
    
}

export const dropEmpleadolById=async (req,res)=>{
    const {id}=req.params;
    if((await Empleado.findByIdAndDelete(id))!=null)
    res.status(204).json();
    else
    res.status(404).json();
}