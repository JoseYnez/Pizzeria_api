import { Schema,model } from "mongoose";
import bcrypt from "bcryptjs/dist/bcrypt";
import {direccionesSchema} from "./direcciones.model"
import {cuponesRelationSchema} from "./cupones.model"
const clientesSchema=new Schema({
    nombre:{type:String,required:[true,"Nombre requerido"],},
    apepat:{type:String},
    apemat:{type:String},
    edad:{type:Number},
    telefono:{type:String},
    correo:{type:String,unique:true,},
    passwd:{type:String},
    direcciones:[direccionesSchema],
    cupones:[cuponesRelationSchema],
},
{versionKey:false});


clientesSchema.statics.ecryptPasswd=async (passwd)=>{
    const salt=await bcrypt.genSalt(10);
    return await bcrypt.hash(passwd,salt);
}
clientesSchema.statics.comparePasswd=async(passwd,npasswd)=>{
    return await bcrypt.compare(passwd,npasswd);
}
export default model('Cliente',clientesSchema);