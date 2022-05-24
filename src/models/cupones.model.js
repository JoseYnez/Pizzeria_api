import mongoose, { Schema,ObjectId,model} from "mongoose";

const infoCuponesSchema=new Schema({
    id_cupon:{type:Schema.Types.ObjectId},
    cantidad:{type:String},
})

const cuponesRelationSchema=new Schema({
    id_cupon:{type:Schema.Types.ObjectId},
    cantidad:{type:Number},
})

const carcteristicasPizzaSchema=new Schema({
    nombre:[{type:String}],
    categoria:[{type:String}],
    tamaño:[{type:String}],
    min_ingredientes:{type:Number},
    max_ingredientes:{type:Number},
    descuento:{type:Number,default:0}
})

const carcteristicasProductoSchema=new Schema({
    nombre:[{type:String}],
    tipo:[{type:String}],
    contenido:{type:Number},
    medida:{type:String},
    descuento:{type:Number,default:0}
})


const cuponSchema=new Schema({
    tipo:{type:String},
    titulo:{type:String},
    restricciones:{type:String},
    imgUrl:{type:String},
    venimiento:{type:Date},
    rest_pizza:[carcteristicasPizzaSchema],
    rest_producto:[carcteristicasProductoSchema],
},{versionKey:false});


module.exports.cuponesRelationSchema=cuponesRelationSchema;
export default model('Cupones',cuponSchema);