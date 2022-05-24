import { Schema,model } from "mongoose";
import {direccionesSchema} from "./direcciones.model"

const sucursalSchema=new Schema({
    nombre:{type:String},
    telefono:{type:String},
    horario_apertura:{type:Date},
    horario_cierre:{type:Date},
    direccion:{type:direccionesSchema},
    
},{versionKey:false})
export default model('Sucursales',sucursalSchema);