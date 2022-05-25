import Pizza from "../models/pizzas.model";

export const createPizza=async (req,res)=>{
    try {
        const pizza=new Pizza(req.body);
        await pizza.save();
        res.status(201).json();
    } catch (error) {
        res.status(404).json();
    }
}

export const updatePizzaById=async (req,res)=>{
    const pizza=await Pizza.findByIdAndUpdate(req.body._id,req.body,{new:true});
    res.status(201).json(pizza);
}

export const getPizzas=async (req,res)=>{
    const pizzas=await Pizza.find();
    res.status(200).json(pizzas);
}

export const dropPizzaById=async (req,res)=>{
    const {id}=req.params;
    if((await Pizza.findByIdAndDelete(id))!=null)
    res.status(204).json();
    else
    res.status(404).json();
}