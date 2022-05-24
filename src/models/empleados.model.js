import { Schema,model } from "mongoose";
import bcrypt from "bcryptjs/dist/bcrypt";
import {direccionesSchema} from "./direcciones.model"

export const tipos = ["general", "admin"];

const empleadoSchema=new Schema({
    tipo:{type:String,default:tipos[0],},
    nombre:{type:String,required:true,},
    apepat:{type:String,required:true,},
    apemat:{type:String,required:true,},
    edad:{type:Number,required:true,},
    telefono:{type:String,required:true,},
    correo:{type:String,unique:true,},
    curp:{type:String,required:true,unique:true},
    passwd:{type:String,required:true,},
    direccion:{type:direccionesSchema},
    id_sucursal:{type:Schema.Types.ObjectId,required:true},
},
{versionKey:false});


empleadoSchema.statics.ecryptPasswd=async (passwd)=>{
    const salt=await bcrypt.genSalt(10);
    return await bcrypt.hash(passwd,salt);
}
empleadoSchema.statics.comparePasswd=async(passwd,npasswd)=>{
    return await bcrypt.compare(passwd,npasswd);
}
export default model('Empleado',empleadoSchema);