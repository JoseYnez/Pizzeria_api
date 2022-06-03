import { Schema,model} from "mongoose";

const  IngredienteSucursalSchema=new Schema({
    id_sucursal:{type:Schema.Types.ObjectId},
    id_ingrediente:{type:Schema.Types.ObjectId},
    cantidad_porciones:{type:Number},
},{versionKey:false})
export default model('IngredienteSucursales',IngredienteSucursalSchema);