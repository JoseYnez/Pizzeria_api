import Empleado from "../models/empleados.model";

export const getEmpleados=async (req,res)=>{
    const empleados=await Empleado.find();
    res.status(200).json(empleados);

}

export const getEmpleadoById=async (req,res)=>{
    const empleado=await Empleado.findById(req.params.id);
    res.status(200).json(empleado);
}

export const createEmpleado=async (req,res)=>{
    try {
        const empleado=new Empleado(req.body);
        await empleado.save();
        res.status(201).json();
    } catch (error) {
        res.status(404).json();
    }
}

export const updateEmpleadoById=async (req,res)=>{
    const empleado=await Empleado.findByIdAndUpdate(req.body._id,req.body,{new:true});
    res.status(201).json(empleado);
}

export const dropEmpleadolById=async (req,res)=>{
    const {id}=req.params;
    if((await Empleado.findByIdAndDelete(id))!=null)
    res.status(204).json();
    else
    res.status(404).json();
}