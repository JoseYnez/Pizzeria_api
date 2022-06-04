import Cupon from "../models/cupones.model";

export const createCupon=async (req,res)=>{
    try {
        const cupon=new Cupon(req.body);
        await cupon.save();
        res.status(201).json();
    } catch (error) {
        res.status(404).json();
    }
}


export const updateCuponById=async (req,res)=>{
    const cupon=await Cupon.findByIdAndUpdate(req.body._id,req.body,{new:true});
    res.status(201).json();
}

export const getCupones=async (req,res)=>{
    const cupones=await Cupon.find();
    res.status(200).json(cupones);
}

export const getValidCupones=async (req,res)=>{
    const cupones=await Cupon.find({vencimiento:{"$gte":Date()}});
    res.status(200).json(cupones);
}

export const dropCuponById=async (req,res)=>{
    const {id}=req.params;
    if((await Cupon.findByIdAndDelete(id))!=null)
    res.status(204).json();
    else
    res.status(404).json();
}