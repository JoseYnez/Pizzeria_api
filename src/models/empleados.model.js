import { Schema,model } from "mongoose";
import bcrypt from "bcryptjs/dist/bcrypt";
import {direccionesSchema} from "./direcciones.model"

export const tipos = ["general", "admin"];

const empleadoSchema=new Schema({
    tipo:{type:String,required:[true,"tipo requerido"],},
    nombre:{type:String,required:[true,"Nombre requerido"],},
    apepat:{type:String},
    apemat:{type:String},
    edad:{type:Number},
    telefono:{type:String},
    correo:{type:String,unique:true,},
    curp:{type:String},
    passwd:{type:String},
    direcciones:{type:direccionesSchema},
    id_sucursal:{type:Schema.Types.ObjectId},
},
{versionKey:false});


empleadoSchema.statics.ecryptPasswd=async (passwd)=>{
    const salt=await bcrypt.genSalt(10);
    return await bcrypt.hash(passwd,salt);
}
empleadoSchema.statics.comparePasswd=async(passwd,npasswd)=>{
    return await bcrypt.compare(passwd,npasswd);
}
export default model('Cliente',empleadoSchema);