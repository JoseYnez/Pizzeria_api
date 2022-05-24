import Cliente from "../models/clientes.model";
import jwt from "jsonwebtoken";
import config from "../config"

export const clienteSingUp=async (req,res)=>{
    const {nombre,apepat,apemat,edad,telefono,correo,passwd,direcciones,cupones}=req.body;
    const cliente=new Cliente({
        nombre,apepat,apemat,edad,telefono,correo,passwd:await Cliente.ecryptPasswd(passwd),direcciones,cupones
    });
    try {
            const saveCliente=await cliente.save();
            const token=jwt.sign({_id:saveCliente._id,correo:saveCliente.correo},config.secret);
            res.status(201).send({token});
        } catch (error) {
            res.status(404).send(false);
        }
}

export const clienteSingIn=async (req,res)=>{
    
    const clienteFound=await Cliente.findOne({correo:req.body.correo},{_id:1,correo:1,passwd:1});
    
    if(!clienteFound) return res.status(404).json({token:null});
    const matchPasswd=await Cliente.comparePasswd(req.body.passwd,clienteFound.passwd);
    if(!matchPasswd) return res.status(401).json({token:null});
    const token=jwt.sign({_id:clienteFound._id,correo:clienteFound.correo},config.secret);
    res.status(201).json({token:token});
}