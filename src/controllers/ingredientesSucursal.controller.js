import Ingrediente from "../models/ingredientes.model";
import Producto from "../models/productos.model";
import IngredienteSucursal from "../models/ingredientesSucursal.model";
import Inventario from "../models/inventarios.model";
import { Types } from "mongoose";


export const updatePorcionesIngrediente=async (req,res)=>{
    if((await Ingrediente.findByIdAndDelete(id))!=null)
    res.status(204).json();
    else
    res.status(404).json();
}

export const updatePorcionesIngredienteBySucursal=async (req,res)=>{
    try {
        const {id}=req.params;
    const idSucursal=Types.ObjectId(id)
    const productos=await Inventario.aggregate([{
        $lookup: {
         from: 'productos',
         localField: 'id_producto',
         foreignField: '_id',
         as: 'producto'
        }
       }, {
        $unwind: {
         path: '$producto'
        }
       }, {
        $match: {
         id_sucursal: idSucursal,
         'producto.tipo': 'ingrediente'
        }
       }, {
        $lookup: {
         from: 'ingredientes',
         localField: 'producto._id',
         foreignField: 'id_producto',
         as: 'ingrediente'
        }
       }, {
        $unwind: {
         path: '$ingrediente'
        }
       }, {
        $addFields: {
         id_ingrediente: '$ingrediente._id'
        }
       }, {
        $project: {
         _id: 0,
         id_ingrediente: 1,
         id_sucursal: 1,
         cantidad_porciones: {
          $divide: [
           {
            $multiply: [
             '$cantidad',
             '$producto.contenido'
            ]
           },
           '$ingrediente.porcion'
          ]
         }
        }
       }]);
    let i=0
    while(i<productos.length){
        const data=await IngredienteSucursal.updateOne(
            {id_sucursal:productos[i].id_sucursal,id_ingrediente:productos[i].id_ingrediente},
            { $set: productos[i]},{upsert:true})
            i++;
    }
    res.status(200).json();
    } catch (error) {
        res.status(404).json();
    }
    
}

export const updatePorcionesIngredientes=async (req,res)=>{
    const {id}=req.params;
    const idSucursal=Types.ObjectId(id)
    const productos=await Inventario.aggregate([{
        $lookup: {
         from: 'productos',
         localField: 'id_producto',
         foreignField: '_id',
         as: 'producto'
        }
       }, {
        $unwind: {
         path: '$producto'
        }
       }, {
        $match: {
         'producto.tipo': 'ingrediente'
        }
       }, {
        $lookup: {
         from: 'ingredientes',
         localField: 'producto._id',
         foreignField: 'id_producto',
         as: 'ingrediente'
        }
       }, {
        $unwind: {
         path: '$ingrediente'
        }
       }, {
        $addFields: {
         id_ingrediente: '$ingrediente._id'
        }
       }, {
        $project: {
         _id: 0,
         id_ingrediente: 1,
         id_sucursal: 1,
         cantidad_porciones: {
          $divide: [
           {
            $multiply: [
             '$cantidad',
             '$producto.contenido'
            ]
           },
           '$ingrediente.porcion'
          ]
         }
        }
       }]);
    let i=0
    while(i<productos.length){
        const data=await IngredienteSucursal.updateOne(
            {id_sucursal:productos[i].id_sucursal,id_ingrediente:productos[i].id_ingrediente},
            { $set: productos[i]},{upsert:true})
            i++;
    }
    res.status(200).json();
}


