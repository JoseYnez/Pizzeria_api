import Empleado from "../models/empleados.model";


export const getEmpleados=async (req,res)=>{
    const empleados=await Empleado.find({},{passwd:0});
    res.status(200).json(empleados);

}

export const getEmpleadoById=async (req,res)=>{
    const empleado=await Empleado.findById(req.params.id,{passwd:0});
    res.status(200).json(empleado);
}

export const getEmpleadoBySucursal=async (req,res)=>{
    try {
        let empleados
        if(req.body.sucursales.lenght>0 && req.body.tipos>0)empleados=await Empleado.find({id_sucursal:{$in:req.body.sucursales},tipo:{$in:req.body.tipos}},{passwd:0});
        else if(req.body.sucursales.lenght>0 && req.body.tipos==0)empleados=await Empleado.find({id_sucursal:{$in:req.body.sucursales}},{passwd:0});
        else if(req.body.sucursales.lenght==0 && req.body.tipos>0)empleados=await Empleado.find({tipo:{$in:req.body.tipos}},{passwd:0});
        else empleados=await Empleado.find({},{passwd:0});
        res.status(200).json(empleados);
    } catch (error) {
        res.status(404).json();
    }
    
}

export const createEmpleado=async (req,res)=>{
    try {
        const {nombre,apepat,apemat,edad,telefono,correo,curp,passwd,direccion,id_sucursal}=req.body;
        const empleado=new Empleado({nombre,apepat,apemat,edad,telefono,correo,curp,passwd:await Empleado.ecryptPasswd(passwd),direccion,id_sucursal});
        await empleado.save();
        res.status(201).json();
    } catch (error) {
        console.log(error)
        res.status(404).json();
    }
}

export const updateEmpleadoById=async (req,res)=>{
    const empleado=await Empleado.findByIdAndUpdate(req.body._id,req.body,{new:true});
    if (empleado!=null)res.status(201).json(empleado);
    else res.status(404).json();
}

export const dropEmpleadolById=async (req,res)=>{
    const {id}=req.params;
    if((await Empleado.findByIdAndDelete(id))!=null)
    res.status(204).json();
    else
    res.status(404).json();
}