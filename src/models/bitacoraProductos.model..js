import { Schema,model} from "mongoose";

const momentos=["entrada","conteo"];

const  bitacoraProductoSchema=new Schema({
    tipo:{type:String},
    id_sucursal:{type:Schema.Types.ObjectId},
    id_producto:{type:Schema.Types.ObjectId},
    diferencia:{type:Number},
    cantidad:{type:Number},
    fecha:{type:Date}
},{versionKey:false})
export default model('BitacoraProducto',bitacoraProductoSchema);