import { Schema,model } from "mongoose";

const productoRelationSchema=new Schema({
    id_producto:{type:Schema.Types.ObjectId},
    precio:{type:Number},
})


const productoSchema=new Schema({
    nombre:{type:String},
    contenido:{type:Number},
    medida:{type:String},
    imgUrl:{type:String},
    tipo:{type:String},
    
},{versionKey:false})
module.exports.productoRelationSchema=productoRelationSchema;
export default model('Producto',productoSchema);