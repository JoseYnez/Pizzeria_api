import { Schema,model} from "mongoose";

const  bitacoraIngredientesSchema=new Schema({
    id_sucursal:{type:Schema.Types.ObjectId},
    id_ingrediente:{type:Schema.Types.ObjectId},
    cantidad_ingrediente:{type:Number},
    id_producto:{type:Schema.Types.ObjectId},
    cantidad_producto:{type:Number},
    diferencia:{type:Number},
    fecha:{type:Date}
},{versionKey:false})
export default model('BitacoraIngrediente',bitacoraIngredientesSchema);