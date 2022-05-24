import { Schema,model } from "mongoose";
import {pizzaRelationSchema} from "./pizzas.model";
import {productoRelationSchema} from "./productos.model";

export const estados = ["generado","preparando","listo","terminado"];

const pizzaSchema=new Schema({
    total:{type:String,unique:true},
    estado:{type:String,default:estados[0]},
    fecha:{type:Date},
    id_cliente:{type:Schema.Types.ObjectId,required:true},
    id_cupon:{type:Schema.Types.ObjectId,required:true},
    id_empleado:{type:Schema.Types.ObjectId,required:true},
    pizzas:[pizzaRelationSchema],
    productos:[productoRelationSchema]
    
},{versionKey:false})
module.exports.pizzaRelationSchema=pizzaRelationSchema;
export default model('Pizza',pizzaSchema);