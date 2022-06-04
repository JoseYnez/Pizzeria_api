import { Schema,Types} from "mongoose";
import Producto from "../models/productos.model";

export const createProducto=async (req,res)=>{
    const producto=new Producto(req.body);
    const productos=await Producto.find({nombre:producto.nombre,marca:producto.marca,contenido:producto.contenido,medida:producto.medida,tipo:producto.tipo});
    if (productos.length===0){
    const nproducto=await producto.save();
    res.status(201).json();}
    else{
        res.status(404).json();
    }
}
export const getProducto=async (req,res)=>{
    const producto=await Producto.findById(req.params.id);
    res.status(200).json(producto);
}
export const getProductoNoI=async (req,res)=>{
    const producto=await Producto.find({_id:req.params.id,tipo:{ $ne: "ingrediente" }});
    res.status(200).json(producto);
}
export const getProductos=async (req,res)=>{
    const productos=await Producto.find();
    res.status(200).json(productos);

}
export const getProductosNoI=async (req,res)=>{
    const productos=await Producto.find({tipo:{ $ne: "ingrediente" }});
    res.status(200).json(productos);

}
export const updateProductoById=async (req,res)=>{
    const producto=await Producto.findByIdAndUpdate(req.body._id,req.body,{new:true});
    res.status(201).json(producto);
}
export const dropProductoById=async (req,res)=>{
    const {id}=req.params;
    if((await Producto.findByIdAndDelete(id))!=null)
    res.status(204).json();
    else
    res.status(404).json();
}

export const getProductoQuery=async (req,res)=>{
    //let a=new Array<Schema.Types.ObjectId>();
    let producto;
    try {
        let objectIdproductos = req.body.ids_productos.map(s => Types.ObjectId(s));
        let objectIdsucursales = req.body.ids_sucursales.map(s => Types.ObjectId(s));
        if(req.body.ids_productos.length>0 && req.body.ids_sucursales.length>0){
            producto=await Producto.aggregate([
                {$match: {_id: {$in: objectIdproductos}}}, 
                {$lookup: {from: 'inventarios',localField: '_id',foreignField: 'id_producto',as: 'inventario'}}, 
                {$unwind: { path: '$inventario'}}, 
                {$match: {'inventario.id_sucursal': {$in: objectIdsucursales}}}, 
                {$lookup: {from: 'sucursales',localField: 'inventario.id_sucursal',foreignField: '_id',as: 'sucursal'}}, 
                {$unwind: {path: '$sucursal'}}, 
                {$addFields: { cantidad: '$inventario.cantidad',nombre_sucursal: '$sucursal.nombre',id_sucursal: '$inventario.id_sucursal'}}, 
                {$project: {inventario: 0,sucursal: 0}}
            ]);
        }
        else if(req.body.ids_productos.length>0 && req.body.ids_sucursales.length==0){
            producto=await Producto.aggregate([
                {$match: {_id: {$in: objectIdproductos}}}, 
                {$lookup: {from: 'inventarios',localField: '_id',foreignField: 'id_producto',as: 'inventario'}}, 
                {$unwind: { path: '$inventario'}}, 
                {$lookup: {from: 'sucursales',localField: 'inventario.id_sucursal',foreignField: '_id',as: 'sucursal'}}, 
                {$unwind: {path: '$sucursal'}}, 
                {$addFields: { cantidad: '$inventario.cantidad',nombre_sucursal: '$sucursal.nombre',id_sucursal: '$inventario.id_sucursal'}}, 
                {$project: {inventario: 0,sucursal: 0}}
            ]);
        }
        else if(req.body.ids_productos.length==0 && req.body.ids_sucursales.length>0){
            console.log("no producto si sucursal")
            producto=await Producto.aggregate([
                {$lookup: {from: 'inventarios',localField: '_id',foreignField: 'id_producto',as: 'inventario'}}, 
                {$unwind: { path: '$inventario'}}, 
                {$match: {'inventario.id_sucursal': {$in: objectIdsucursales}}}, 
                {$lookup: {from: 'sucursales',localField: 'inventario.id_sucursal',foreignField: '_id',as: 'sucursal'}}, 
                {$unwind: {path: '$sucursal'}}, 
                {$addFields: { cantidad: '$inventario.cantidad',nombre_sucursal: '$sucursal.nombre',id_sucursal: '$inventario.id_sucursal'}}, 
                {$project: {inventario: 0,sucursal: 0}}
            ]);
        }
        else{
            producto=await Producto.aggregate([
                {$lookup: {from: 'inventarios',localField: '_id',foreignField: 'id_producto',as: 'inventario'}}, 
                {$unwind: { path: '$inventario'}}, 
                {$lookup: {from: 'sucursales',localField: 'inventario.id_sucursal',foreignField: '_id',as: 'sucursal'}}, 
                {$unwind: {path: '$sucursal'}}, 
                {$addFields: { cantidad: '$inventario.cantidad',nombre_sucursal: '$sucursal.nombre',id_sucursal: '$inventario.id_sucursal'}}, 
                {$project: {inventario: 0,sucursal: 0}}
            ]);
        }       
    } catch (error) {
        res.status(404).json();
    }

    res.status(200).json(producto);
}