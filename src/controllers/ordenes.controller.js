import Orden from "../models/ordenes.model";

export const createOrden=async (req,res)=>{
    try {
        const orden=new Orden(req.body);
        await orden.save();
        res.status(201).json();
    } catch (error) {
        res.status(404).json();
    }
}

export const updateOrdenById=async (req,res)=>{
    const orden=await Orden.findByIdAndUpdate(req.body._id,req.body,{new:true});
    res.status(201).json(orden);
}

export const getOrdenes=async (req,res)=>{
    const ordenes=await Orden.find();
    res.status(200).json(ordenes);
}

export const dropOrdenById=async (req,res)=>{
    const {id}=req.params;
    if((await Orden.findByIdAndDelete(id))!=null)
    res.status(204).json();
    else
    res.status(404).json();
}