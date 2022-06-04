import { Schema,model } from "mongoose";

const ingredienteRelationSchema=new Schema({
    id_ingrediente:{type:Schema.Types.ObjectId},
    porciones:{type:Number},
})

const ingredienteSchema=new Schema({
    nombre:{type:String,unique:true},
    porcion:{type:Number},
    medida:{type:String},
    precio_porcion:{type:Number},
    imgUrl:{type:String},
    id_producto:{ref:"productos",type:Schema.Types.ObjectId},
    
},{versionKey:false,timestamps: true})
module.exports.ingredienteRelationSchema=ingredienteRelationSchema;
export default model('Ingrediente',ingredienteSchema);