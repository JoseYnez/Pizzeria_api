import { Schema,model } from "mongoose";
import {ingredienteRelationSchema} from "./ingredientes.model";

const tamaños=["chica","mediana","grande","familiar"];
const pizzatamanosSchema=new Schema({
    tamaño:{type:String},
    precio:{type:Number},
    ingredientes:[ingredienteRelationSchema],
});

const pizzaRelationSchema=new Schema({
    nombre:{type:String,unique:true},
    precio:{type:Number},
    categoria:{type:Number},
    info:{type:pizzatamanosSchema},
    id_pizza:{type:Schema.Types.ObjectId}
})

const pizzaSchema=new Schema({
    nombre:{type:String,unique:true},
    precio:{type:Number},
    tamaño:{type:String},
    categoria:{type:Number},
    imgUrl:{type:String},
    calificacion:{type:Number,default:null},
    ingredientes:[ingredienteRelationSchema]
    
},{versionKey:false,timestamps: true})



const pizza2Schema=new Schema({
    nombre:{type:String,unique:true},
    categoria:{type:String},
    imgUrl:{type:String},
    calificacion:{type:Number},
    tamaños:[pizzatamanosSchema],
    
},{versionKey:false,timestamps: true})

module.exports.pizzaRelationSchema=pizzaRelationSchema;
export default model('Pizza',pizza2Schema);