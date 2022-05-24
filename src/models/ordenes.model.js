import { Schema,model } from "mongoose";
import {pizzaRelationSchema} from "./pizzas.model";
import {productoRelationSchema} from "./productos.model";

const pizzaSchema=new Schema({
    total:{type:String,unique:true},
    estado:{type:Number},
    fecha:{type:String},
    id_cliente:{type:Schema.Types.ObjectId},
    id_cupon:{type:Schema.Types.ObjectId},
    id_empleado:{type:Schema.Types.ObjectId},
    pizzas:[pizzaRelationSchema],
    productos:[productoRelationSchema]
    
},{versionKey:false})
module.exports.pizzaRelationSchema=pizzaRelationSchema;
export default model('Pizza',pizzaSchema);