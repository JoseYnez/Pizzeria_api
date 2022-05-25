import { Schema,ObjectId,model} from "mongoose";

const  direccionesSchema=new Schema({
    calle:{type:String},
    num_ext:{type:String},
    num_int:{type:String},
    colonia:{type:String},
    estado:{type:String},
    cp:{type:String},
})
module.exports.direccionesSchema= direccionesSchema;
//export default model('Direcciones',direccionesSchema);