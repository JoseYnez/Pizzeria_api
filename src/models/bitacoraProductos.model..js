import { Schema,model} from "mongoose";

const momentos=["entrada","conteo"];

const  bitacoraProductoSchema=new Schema({
    id_sucursal:{type:Schema.Types.ObjectId},
    id_producto:{type:Schema.Types.ObjectId},
    cantidad_anterior:{type:Number},
    cantidad:{type:Number},
    fecha:{type:Date,default:Date.now()}
},{versionKey:false})
export default model('BitacoraProducto',bitacoraProductoSchema);