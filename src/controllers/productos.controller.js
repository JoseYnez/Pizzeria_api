import Producto from "../models/productos.model";

export const createProducto=async (req,res)=>{
    const producto=new Producto(req.body);
    const nproducto=await producto.save();
    res.status(201).json();
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