import Orden from "../models/ordenes.model";
import Empleado from "../models/empleados.model";
import IngredienteSucursal from "../models/ingredientesSucursal.model";
import Inventario from "../models/inventarios.model";
import Cupon from "../models/cupones.model";
import { Types } from "mongoose";

export const createOrden=async (req,res)=>{
    try {
        const productoss=req.body.productos;
        const empleados=await Empleado.find({id_sucursal:req.body.id_sucursal,activo:true})
        const cupon=await Cupon.findById(req.body.id_cupon);
        const ingredientesSucursal= await IngredienteSucursal.find({id_sucursal:req.body.id_sucursal},{_id:0,id_sucursal:0})
        const ingredientesSucursal2=await IngredienteSucursal.find({id_sucursal:req.body.id_sucursal},{_id:0,id_sucursal:0})
        
        const inventarios=await Inventario.find({id_sucursal:req.body.id_sucursal,tipo:{ $ne: "ingrediente" }},{id_sucursal:0,_id:0})
        const inventarios2=await Inventario.find({id_sucursal:req.body.id_sucursal,tipo:{ $ne: "ingrediente" }},{id_sucursal:0,_id:0})
        let nPizzas=[];
        let nProductos=[];
        let k;
        for(k=0;k<ingredientesSucursal2.length;k++){
            ingredientesSucursal2[k].cantidad_porciones=0;
        }
        for(k=0;k<inventarios2.length;k++){
            inventarios2[k].cantidad=0;
        }

        for(k=0;k<req.body.pizzas.length;k++){
            const ingredeintes=req.body.pizzas[k].info.ingredientes;
        
            let j
            let band=true;
            for(j=0;j<ingredeintes.length;j++){
                let i=0;
                for(i=0;i<ingredientesSucursal.length;i++){
                    if(ingredientesSucursal[i].id_ingrediente.equals(Types.ObjectId(ingredeintes[0].id_ingrediente))){
                    break;
                    }
                }
                if(i<ingredientesSucursal.length){
                    if(ingredeintes[i].porciones>ingredientesSucursal[i].cantidad_porciones){
                        band=false;
                        break;
                    }
                }else{
                    band=false;
                    break;
                }
            }
            if(!band){
               nPizzas.push(k);
            }else{
                for(j=0;j<ingredeintes.length;j++){
                    let i=0;
                    for(i=0;i<ingredientesSucursal.length;i++){
                        if(ingredientesSucursal[i].id_ingrediente.equals(Types.ObjectId(ingredeintes[j].id_ingrediente))){
                        break;
                        }
                    }
                    if(i<ingredientesSucursal.length){
                        ingredientesSucursal[i].cantidad_porciones-=ingredeintes[j].porciones;
                        ingredientesSucursal2[i].cantidad_porciones+=ingredeintes[j].porciones; 
                    }
                }
            }
        }
        let i;
        for(k=0;k<req.body.productos.length;k++){
            i=0;
            for(i=0;i<inventarios.length;i++){
                if(inventarios[i].id_producto.equals(Types.ObjectId(productoss[k].id_producto))){
                break;
                }
            }
            if(i<inventarios.length){
                if(inventarios[i].cantidad<productoss[k].cantidad){
                   nProductos.push(k); 
                }else{
                    inventarios[i].cantidad-=productoss[k].cantidad;
                    inventarios2[i].cantidad+=productoss[k].cantidad;
                }
            }else{
                nProductos.push(k); 
            }
        }
        
        if(nPizzas.length>0 || nProductos.length>0){
            const repuesta={creado:false,pizzas:nPizzas,productos:nProductos,cupon:true}
            res.status(201).json(repuesta);
        }else{
            
            const {total,id_cliente,id_cupon,id_sucursal,pizzas,productos}=req.body;
            const ingredientesSucursal3=await IngredienteSucursal.find({id_sucursal:req.body.id_sucursal},{_id:0,id_sucursal:0})
            for(i=0;i<ingredientesSucursal2.length;i++){
                if(ingredientesSucursal2[i].cantidad_porciones>0){
                    const info={id_ingrediente:ingredientesSucursal3[i].id_ingrediente,cantidad_porciones:ingredientesSucursal3[i].cantidad_porciones-=ingredientesSucursal2[i].cantidad_porciones}
                    const data=await IngredienteSucursal.updateOne(
                        {id_sucursal:req.body.id_sucursal,id_ingrediente:ingredientesSucursal2[i].id_ingrediente},
                        { $set: info},{upsert:true})
                }
            }
            const inventarios3=await Inventario.find({id_sucursal:req.body.id_sucursal,tipo:{ $ne: "ingrediente" }},{id_sucursal:0,_id:0})
            for(i=0;i<inventarios2.length;i++){
                if(inventarios2[i].cantidad>0){
                    const info={id_producto:inventarios3[i].id_producto,cantidad:inventarios3[i].cantidad-=inventarios3[i].cantidad}
                    const data=await inventarios2.updateOne(
                        {id_sucursal:req.body.id_sucursal,id_producto:inventarios2[i].id_producto},
                        { $set: info},{upsert:true})
                }
            }
            const id_empleado=null;
            const orden=new Orden({total,id_cliente,id_cupon,id_empleado,id_sucursal,pizzas,productos});
            const a=await orden.save();
            //console.log(a);
            const repuesta={creado:true,pizzas:nPizzas,productos:nProductos,cupon:true}
            res.status(201).json(repuesta);
        }

        //await orden.save();
        res.status(201).json();
    } catch (error) {
        console.log(error)
        res.status(404).json();
    }
}


export const validarOrden=async (req,res)=>{
    try {
        const productoss=req.body.productos;
        const cupon=await Cupon.findById(req.body.id_cupon);
        const ingredientesSucursal= await IngredienteSucursal.find({id_sucursal:req.body.id_sucursal},{_id:0,id_sucursal:0})
        const ingredientesSucursal2=await IngredienteSucursal.find({id_sucursal:req.body.id_sucursal},{_id:0,id_sucursal:0})
        
        const inventarios=await Inventario.find({id_sucursal:req.body.id_sucursal,tipo:{ $ne: "ingrediente" }},{id_sucursal:0,_id:0})
        const inventarios2=await Inventario.find({id_sucursal:req.body.id_sucursal,tipo:{ $ne: "ingrediente" }},{id_sucursal:0,_id:0})
        let nPizzas=[];
        let nProductos=[];
        let k;
        for(k=0;k<ingredientesSucursal2.length;k++){
            ingredientesSucursal2[k].cantidad_porciones=0;
        }
        for(k=0;k<inventarios2.length;k++){
            inventarios2[k].cantidad=0;
        }

        for(k=0;k<req.body.pizzas.length;k++){
            const ingredeintes=req.body.pizzas[k].info.ingredientes;
        
            let j
            let band=true;
            for(j=0;j<ingredeintes.length;j++){
                let i=0;
                for(i=0;i<ingredientesSucursal.length;i++){
                    if(ingredientesSucursal[i].id_ingrediente.equals(Types.ObjectId(ingredeintes[0].id_ingrediente))){
                    break;
                    }
                }
                if(i<ingredientesSucursal.length){
                    if(ingredeintes[i].porciones>ingredientesSucursal[i].cantidad_porciones){
                        band=false;
                        break;
                    }
                }else{
                    band=false;
                    break;
                }
            }
            if(!band){
               nPizzas.push(k);
            }else{
                for(j=0;j<ingredeintes.length;j++){
                    let i=0;
                    for(i=0;i<ingredientesSucursal.length;i++){
                        if(ingredientesSucursal[i].id_ingrediente.equals(Types.ObjectId(ingredeintes[j].id_ingrediente))){
                        break;
                        }
                    }
                    if(i<ingredientesSucursal.length){
                        ingredientesSucursal[i].cantidad_porciones-=ingredeintes[j].porciones;
                        ingredientesSucursal2[i].cantidad_porciones+=ingredeintes[j].porciones; 
                    }
                }
            }
        }
        let i;
        for(k=0;k<req.body.productos.length;k++){
            i=0;
            for(i=0;i<inventarios.length;i++){
                if(inventarios[i].id_producto.equals(Types.ObjectId(productoss[k].id_producto))){
                break;
                }
            }
            if(i<inventarios.length){
                if(inventarios[i].cantidad<productoss[k].cantidad){
                   nProductos.push(k); 
                }else{
                    inventarios[i].cantidad-=productoss[k].cantidad;
                    inventarios2[i].cantidad+=productoss[k].cantidad;
                }
            }else{
                nProductos.push(k); 
            }
        }
        
        if(nPizzas.length>0 || nProductos.length>0){
            const repuesta={valido:false,pizzas:nPizzas,productos:nProductos,cupon:true}
            res.status(201).json(repuesta);
        }else{
            const repuesta={valido:true,pizzas:nPizzas,productos:nProductos,cupon:true}
            res.status(201).json(repuesta);
        }
        res.status(201).json();
    } catch (error) {
        console.log(error)
        res.status(404).json();
    }
}
/*export const updateOrdenById=async (req,res)=>{
    const orden=await Orden.findByIdAndUpdate(req.body._id,req.body,{new:true});
    res.status(201).json(orden);
}*/

export const getOrdenes=async (req,res)=>{
    const ordenes=await Orden.find();
    res.status(200).json(ordenes);
}

export const getOrdenesByEmpleado=async (req,res)=>{
    const token=req.headers["token"];
    if(token){
        const decode=jwt.verify(token,config.superscret);
        const ordenes=await Orden.find({id_empleado:decode._id}).sort();
    }
    const ordenes=await Orden.find();
    res.status(200).json(ordenes);
}

/*export const dropOrdenById=async (req,res)=>{
    const {id}=req.params;
    if((await Orden.findByIdAndDelete(id))!=null)
    res.status(204).json();
    else
    res.status(404).json();
}*/