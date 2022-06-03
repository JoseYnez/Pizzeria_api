import { Schema,model } from "mongoose";
import {direccionesSchema} from "./direcciones.model"

const sucursalSchema=new Schema({
    nombre:{type:String,required:true},
    telefono:{type:String,required:true},
    horario_apertura:{type:Date,required:true},
    horario_cierre:{type:Date,required:true},
    direccion:{type:direccionesSchema},
},{versionKey:false,timestamps: true})
export default model('Sucursales',sucursalSchema);