import Cliente from "../models/clientes.model";

export const getClientes=async (req,res)=>{
    const clientes=await Cliente.find();
    res.status(200).json(clientes);

}

export const getClienteById=async (req,res)=>{
    const cliente=await Cliente.findById(req.params.id);
    res.status(200).json(cliente);
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

export const updateClienteById=async (req,res)=>{
    const cliente=await Cliente.findByIdAndUpdate(req.body._id,req.body,{new:true});
    res.status(201).json(cliente);
}

export const dropClientelById=async (req,res)=>{
    const {id}=req.params;
    if((await Cliente.findByIdAndDelete(id))!=null)
    res.status(204).json();
    else
    res.status(404).json();
}