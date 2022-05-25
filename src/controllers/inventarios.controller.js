import Inventario from "../models/inventario.model";

export const getInventarios=async (req,res)=>{
    const inventarios=await Inventario.find();
    res.status(200).json(inventarios);

}

export const getInventarioById=async (req,res)=>{
    const inventario=await Inventario.findById(req.params.id);
    res.status(200).json(inventario);
}

export const getInventarioByIdSucursal=async (req,res)=>{
    const inventario=await Inventario.find({id_sucursal:req.params.id});
    res.status(200).json(inventario);
}

export const getInventarioByIdProducto=async (req,res)=>{
    const inventario=await Inventario.findById({id_producto:req.params.id});
    res.status(200).json(inventario);
}

export const getInventarioByQuery=async (req,res)=>{
    let inventario;
    try {
        if(req.body.ids_sucursal.length>0 && req.body.ids_producto.length>0){
            inventario=await Inventario.find({id_producto:{$in:req.body.ids_producto},id_sucursal:{$in:req.body.ids_sucursal}});
        }
        else if(req.body.ids_sucursal.length>0 && req.body.ids_producto.length==0){
            inventario=await Inventario.find({id_sucursal:{$in:req.body.ids_sucursal}});
        }
        else if(req.body.ids_sucursal.length==0 && req.body.ids_producto.length>0){
            inventario=await Inventario.find({id_producto:{$in:req.body.ids_producto}});
        }
        else {
            inventario=await Inventario.find();
        }
        res.status(200).json(inventario);
    } catch (error) {
            console.log(error);
            res.status(404).json();
    }
    
    
}



export const createInventario=async (req,res)=>{
    try {
        const inventario=new Inventario(req.body);
        await inventario.save();
        res.status(201).json();
    } catch (error) {
        res.status(404).json();
    }
}

export const updateInventarioById=async (req,res)=>{
    const inventario=await Inventario.findByIdAndUpdate(req.body._id,req.body,{new:true});
    res.status(201).json(inventario);
}

export const updateCantidadproductos=async (req,res)=>{
    const inventario=await Inventario.findByIdAndUpdate(req.body._id,req.body,{new:true});
    res.status(201).json(inventario);
}

export const dropInventarioById=async (req,res)=>{
    const {id}=req.params;
    if((await Inventario.findByIdAndDelete(id))!=null)
    res.status(204).json();
    else
    res.status(404).json();
}