import { Schema,model } from "mongoose";
import {pizzaRelationSchema} from "./pizzas.model";
import {productoRelationSchema} from "./productos.model";

export const estados = ["generado","preparando","listo","pagado","entregado"];

const ordenesSchema=new Schema({
    total:{type:Number},
    estado:{type:String,default:estados[0]},
    fecha:{type:Date,default:Date.now()},
    id_cliente:{type:Schema.Types.ObjectId,required:true},
    id_cupon:{type:Schema.Types.ObjectId},
    id_empleado:{type:Schema.Types.ObjectId},
    id_sucursal:{type:Schema.Types.ObjectId,required:true},
    pizzas:[pizzaRelationSchema],
    productos:[productoRelationSchema]
    
},{versionKey:false})

export default model('Ordenes',ordenesSchema);