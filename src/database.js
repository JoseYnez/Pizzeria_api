import mongoose from "mongoose";
require ("dotenv").config();
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{console.log("conection to db")}).catch((error)=>{console.error(error);});