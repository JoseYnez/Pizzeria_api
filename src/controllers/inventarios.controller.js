import Inventario from "../models/inventarios.model";
import Producto from "../models/productos.model";
import Sucursal from "../models/sucursales.model";
import Ingrediente from "../models/ingredientes.model";
import IngredienteSucursal from "../models/ingredientesSucursal.model";
import BitacoraProducto from "../models/bitacoraProductos.model.";
import { Types } from "mongoose";

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
        req.body.pizzas.ingredeintes
        //const inventario=new Inventario(req.body);
        //await inventario.save();
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
              //      console.log("se actualizo")
             //       console.log(newinventario)
            }
                else{
                    if(inventario.cantidad>=0){
                    const ninventario=new Inventario(req.body[i]);
                    const newinventario=await ninventario.save();
  //                  console.log("se creo")
    //                console.log(newinventario)
}
                }
                const datos=await Producto.aggregate([{
                    $match: {
                     _id: Types.ObjectId(req.body[i].id_producto)
                    }
                   }, {
                    $lookup: {
                     from: 'ingredientes',
                     localField: '_id',
                     foreignField: 'id_producto',
                     as: 'ingrediente'
                    }
                   }, {
                    $unwind: {
                     path: '$ingrediente'
                    }
                   }, {
                    $addFields: {
                     id_ingrediente: '$ingrediente._id',
                     porcion: '$ingrediente.porcion'
                    }
                   }, {
                    $project: {
                     _id: 0,
                     id_ingrediente: 1,
                     porcion: 1,
                     contenido: 1
                    }
                   }])
                const ingredeintesS=await IngredienteSucursal.findOne({id_sucursal:req.body[i].id_sucursal,id_ingredeinte:datos[0].id_ingredeinte},{cantidad_porciones:1})
                //console.log(datos)
                const info={id_sucursal:req.body[i].id_sucursal,
                id_ingrediente:datos[0].id_ingrediente,
                cantidad_porciones:ingredeintesS.cantidad_porciones+(req.body[i].cantidad*datos[0].contenido/datos[0].porcion)}
                //console.log(info)
                const data=await IngredienteSucursal.updateOne(
                    {id_sucursal:req.body[i].id_sucursal,id_ingrediente:datos[0].id_ingrediente},
                    { $set: info},{upsert:true})
                    i++;
                i++
            }
        }
        return res.status(204).json();
    } catch (error) {
        console.log(error);
        return res.status(404).json();
    }
    res.status(404).json(req.body);
}

export const updateInventarioWithBitacora=async (req,res)=>{
    try {
        const {id}=req.params;
        const existsS=await Sucursal.findById(id,{_id:1});
        if(existsS){
            let i=0;
            while(req.body.length>i){
                const existsP=await Producto.findById(req.body[i].id_producto,{_id:1,tipo:1,contenido:1});
                if(existsP) {
                    let cantidad=0;
                    const info={id_sucursal:id,id_producto:req.body[i].id_producto,cantidad:req.body[i].cantidad}
                    if(existsP.tipo=="ingrediente"){
                        const cantidadProductos=await Ingrediente.aggregate([{
                            $match: {
                             id_producto: Types.ObjectId(req.body[i].id_producto)
                            }
                           }, {
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
                            $project: {
                             cantidad: '$inventario.cantidad_porciones',
                             porcion:1,
                             _id: 0
                            }
                           }])
                        if(cantidadProductos.length==1){
                            cantidad=(cantidadProductos[0].cantidad*cantidadProductos[0].porcion)/existsP.contenido;
                        }
                    }else{
                        const cantidadProductos= await Inventario.findOne({id_sucursal:id,id_producto:req.body[i].id_producto},{cantidad:1,_id:0});
                        if(cantidadProductos){
                            cantidad=cantidadProductos.cantidad;
                        }
                    }
                    //console.log(cantidad);
                    const bitacora={id_sucursal:id,id_producto:req.body[i].id_producto,cantidad_anterior:cantidad,cantidad:req.body[i].cantidad}
                    const mbitacora=new BitacoraProducto(bitacora)
                    await mbitacora.save();
                    const data=await Inventario.updateOne(
                        {id_sucursal:id,id_producto:req.body[i].id_producto},
                        { $set: info},{upsert:true})
                    //console.log(data);
                }
                i++
            }
        }
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
        return res.status(204).json();
    } catch (error) {
        //console.log(error)
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