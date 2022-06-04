import Inventario from "../models/inventarios.model";
import Producto from "../models/productos.model";
import Sucursal from "../models/sucursales.model";

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
    const existsS=Inventario.findById(req.body.id_sucursal);
    const existsP=Inventario.findById(req.body.id_producto);
    if(exists) {
        const inventario=await Inventario.findByIdAndUpdate(req.body._id,req.body,{new:true});
        res.status(201).json(inventario);
    }else{
        res.status(201).json(inventario);
    }
    
}

export const updateInventario=async (req,res)=>{
    try {
        let i=0;
        let band=false;
        while(req.body.length>i){
            const existsS=await Sucursal.findById(req.body[i].id_sucursal,{_id:1});
            const existsP=await Producto.findById(req.body[i].id_producto,{_id:1});
            if(!existsP || !existsS) band=true;
            i++
        }
        if(!band){
            i=0;
            while(req.body.length>i){
                const inventario=await Inventario.findOne({id_sucursal:req.body[i].id_sucursal,id_producto:req.body[i].id_producto})
                if(inventario){
                    const newinventario=await Inventario.findByIdAndUpdate(inventario._id,req.body[i],{new:true});
                    console.log("se actualizo")
                    console.log(newinventario)}
                else{
                    const ninventario=new Inventario(req.body[i]);
                    const newinventario=await ninventario.save();
                    console.log("se creo")
                    console.log(newinventario)
                }
                i++
            }
        }
        return res.status(204).json();
    } catch (error) {
        return res.status(404).json();
    }
    res.status(404).json(req.body);
}


export const updateCantidadInventario=async (req,res)=>{
    try {
        let i=0;
        let band=false;
        while(req.body.length>i){
            const existsS=await Sucursal.findById(req.body[i].id_sucursal,{_id:1});
            const existsP=await Producto.findById(req.body[i].id_producto,{_id:1});
            if(!existsP || !existsS) band=true;
            i++
        }
        if(!band){
            i=0;
            while(req.body.length>i){
                const inventario=await Inventario.findOne({id_sucursal:req.body[i].id_sucursal,id_producto:req.body[i].id_producto})
                if(inventario){
                    inventario.cantidad+=req.body[i].cantidad;
                    const newinventario=await Inventario.findByIdAndUpdate(inventario._id,inventario,{new:true});
                    console.log("se actualizo")
                    console.log(newinventario)}
                else{
                    if(inventario.cantidad>=0){
                    const ninventario=new Inventario(req.body[i]);
                    const newinventario=await ninventario.save();
                    console.log("se creo")
                    console.log(newinventario)}
                }
                i++
            }
        }
        return res.status(204).json();
    } catch (error) {
        return res.status(404).json();
    }
    res.status(404).json(req.body);
}


export const dropInventarioById=async (req,res)=>{
    const {id}=req.params;
    if((await Inventario.findByIdAndDelete(id))!=null)
    res.status(204).json();
    else
    res.status(404).json();
}