import { Schema,model } from "mongoose";
import {ingredienteRelationSchema} from "./ingredientes.model";

const pizzaRelationSchema=new Schema({
    id_pizza:{type:Schema.Types.ObjectId},
    precio:{type:Number},
    ingredientes:[ingredienteRelationSchema]
})

const pizzaSchema=new Schema({
    nombre:{type:String,unique:true},
    precio:{type:Number},
    tamaño:{type:String},
    categoria:{type:Number},
    imgUrl:{type:String},
    calificacion:{type:Number},
    ingredientes:[ingredienteRelationSchema]
    
},{versionKey:false,timestamps: true})
module.exports.pizzaRelationSchema=pizzaRelationSchema;
export default model('Pizza',pizzaSchema);