import { Schema,ObjectId,model} from "mongoose";

const  inventarioSchema=new Schema({
    id_sucursal:{type:Schema.Types.ObjectId},
    id_producto:{type:Schema.Types.ObjectId},
    cantidad:{type:Number},
})
export default model('Inventario',inventarioSchema);