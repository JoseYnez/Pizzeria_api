import { Schema,model } from "mongoose";



const productoRelationSchema=new Schema({
    id_producto:{type:Schema.Types.ObjectId},
    precio:{type:Number},
})

const arrayObjectIdSchema=new Schema({
    array:[{type:Schema.Types.ObjectId}],
})

const productoSchema=new Schema({
    nombre:{type:String,required:true},
    marca:{type:String,required:true},
    contenido:{type:Number,required:true},
    medida:{type:String,required:true},
    imgUrl:{type:String},
    tipo:{type:String,required:true},
    
},{versionKey:false,timestamps: true})
module.exports.productoRelationSchema=productoRelationSchema;
module.exports.arrayObjectIdSchema=arrayObjectIdSchema;
export default model('Producto',productoSchema);