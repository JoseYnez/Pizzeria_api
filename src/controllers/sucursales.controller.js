import Sucursal from "../models/sucursales.model";

export const getSucursales=async (req,res)=>{
    const sucursales=await Sucursal.find();
    res.status(200).json(sucursales);

}

export const getSucursalById=async (req,res)=>{
    const sucursal=await Sucursal.findById(req.params.id);
    if(sucursal!=null)res.status(200).json(sucursal);
    else res.status(404).json();
}

export const createSucursal=async (req,res)=>{
    try {
        const sucursal=new Sucursal(req.body);
        await sucursal.save();
        res.status(201).json();
    } catch (error) {
        res.status(404).json();
    }
}

export const updateSucursalById=async (req,res)=>{
    const sucursal=await Sucursal.findByIdAndUpdate(req.body._id,req.body,{new:true});
    res.status(201).json(sucursal);
}

export const dropSucursalById=async (req,res)=>{
    const {id}=req.params;
    if((await Sucursal.findByIdAndDelete(id))!=null)
    res.status(204).json();
    else
    res.status(404).json();
}