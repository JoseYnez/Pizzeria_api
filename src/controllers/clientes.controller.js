import Cliente from "../models/clientes.model";

export const getClientes=async (req,res)=>{
    try {
        const clientes=await Cliente.find({},{passwd:0});
        res.status(200).json(clientes);
    } catch (error) {
        res.status(404).json();
    }
}

export const getClienteById=async (req,res)=>{
    try {
        const cliente=await Cliente.findById(req.params.id,{passwd:0});
        res.status(200).json(cliente);
    } catch (error) {
        res.status(404).json();
    }
    
}

export const getCliente=async (req,res)=>{
    try {
        const token=req.headers["token"];
        const decode=jwt.verify(token,config.secret);
        const cliente=await Cliente.findById(decode._id,{passwd:0});
        res.status(200).json(cliente);
    } catch (error) {
        res.status(404).json();
    }
}



export const createCliente=async (req,res)=>{
    try {
        const cliente=new Cliente(req.body);
        await cliente.save();
        res.status(201).json();
    } catch (error) {
        res.status(404).json();
    }
}

export const updateCliente=async (req,res)=>{
    try {
        const token=req.headers["token"];
        const decode=jwt.verify(token,config.secret);
        if(req.body._id==decode._id){
            const cliente=await Cliente.findByIdAndUpdate(req.body._id,req.body,{new:true});
            res.status(201).json(cliente);
        }else{
            res.status(404).json();
        }
    } catch (error) {
        res.status(404).json();
    }
    
}

export const changePassword=async (req,res)=>{
    try {
        const token=req.headers["token"];
        const decode=jwt.verify(token,config.secret);
        if(req.body._id==decode._id){
        const clienteFound=await Cliente.findOne({_id:req.body._id},{_id:1,passwd:1});
        if(!clienteFound) return res.status(404).json(null);
        const matchPasswd=await Empleado.comparePasswd(req.body.passwd,empleadoFound.passwd);
        if(!matchPasswd) return res.status(401).json(null);
        else {
            const cliente=await Cliente.findByIdAndUpdate(req.body._id,{passwd:await Cliente.ecryptPasswd(req.body.passwdn)},{new:true});
            if (cliente!=null)res.status(201).json();
            else res.status(404).json();
    }}
    else res.status(401).json(null);
    } catch (error) {
        res.status(401).json(null);
    }
    

}

export const addCupon=async (req,res)=>{
    try {
        const cliente=await Cliente.findOneAndUpdate(req.body._id,req.body,{new:true});
        res.status(201).json(cliente);
    } catch (error) {
        res.status(404).json();
    }
    
}

export const dropClientelById=async (req,res)=>{
    const {id}=req.params;
    if((await Cliente.findByIdAndDelete(id))!=null)
    res.status(204).json();
    else
    res.status(404).json();
}