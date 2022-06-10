import Ingrediente from "../models/ingredientes.model";
import { Schema,Types,objectId} from "mongoose";

export const createIngrediente=async (req,res)=>{
    try {
        const ingrediente=new Ingrediente(req.body);
        await ingrediente.save();
        res.status(201).json();
    } catch (error) {
        res.status(404).json();
    }
}

export const updateIngredienteById=async (req,res)=>{
    const ingrediente=await Ingrediente.findByIdAndUpdate(req.body._id,req.body,{new:true});
    res.status(201).json(ingrediente);
}

export const getIngredientes=async (req,res)=>{
    const ingredientes=await Ingrediente.find();
    res.status(200).json(ingredientes);
}
export const getIngredientesBySucrsal=async (req,res)=>{
    const {id}=req.params;
    const idSucursal=Types.ObjectId(id)
    const ingredientes=await Ingrediente.aggregate([{
        $lookup: {
         from: 'ingredientesucursales',
         localField: '_id',
         foreignField: 'id_ingrediente',
         as: 'inventario'
        }
       }, {
        $unwind: {
         path: '$inventario'
        }
       }, {
        $match: {
         'inventario.id_sucursal': idSucursal
        }
       }, {
        $addFields: {
         cantidad_porciones: '$inventario.cantidad_porciones'
        }
       }, {
        $project: {
         inventario: 0
        }
       }])
    res.status(200).json(ingredientes);
}

export const dropIngredienteById=async (req,res)=>{
    const {id}=req.params;
    if((await Ingrediente.findByIdAndDelete(id))!=null)
    res.status(204).json();
    else
    res.status(404).json();
}


