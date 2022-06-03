import Empleado from "../models/empleados.model";
import jwt from "jsonwebtoken";
import config from "../config"
////Pendiente
export const EmpleadoSingUp=async (req,res)=>{
    const historial1={activo:true,razon:"Contratacion",fecha:new Date()};
    console.log(historial1);
    const {nombre,apepat,apemat,edad,telefono,correo,curp,passwd,direccion,id_sucursal}=req.body;

    const empleado=new Empleado({
        nombre,apepat,apemat,edad,telefono,correo,curp,passwd:await Empleado.ecryptPasswd(passwd),direccion,id_sucursal
    });
    empleado.historial.push(historial1);
    console.log(empleado);
    try {
            const saveEmpleado=await empleado.save();
            const token=jwt.sign({_id:saveEmpleado._id,correo:saveEmpleado.correo,tipo:saveEmpleado.tipo},config.superscret,{expiresIn:'1m'});
            res.status(201).send({token});
        } catch (error) {
            console.log(error)
            res.status(404).send(false);
        }
}

export const EmpleadoSingIn=async (req,res)=>{
    
    const empleadoFound=await Empleado.findOne({correo:req.body.correo},{_id:1,correo:1,passwd:1,tipo:1});
    console.log(empleadoFound)
    if(!empleadoFound) return res.status(404).json({token:null});
    const matchPasswd=await Empleado.comparePasswd(req.body.passwd,empleadoFound.passwd);
    if(!matchPasswd) return res.status(401).json({token:null});
    const token=jwt.sign({_id:empleadoFound._id,correo:empleadoFound.correo,tipo:empleadoFound.tipo},config.superscret,{expiresIn:'8h'});
    res.status(201).json({token:token});
}