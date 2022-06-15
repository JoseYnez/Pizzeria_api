import Bitacora from "../models/bitacoraProductos.model.";

export const getBitacoras=async (req,res)=>{
    const bitacora=await Bitacora.aggregate([{
        $lookup: {
         from: 'productos',
         localField: 'id_producto',
         foreignField: '_id',
         as: 'producto'
        }
       }, {
        $lookup: {
         from: 'sucursales',
         localField: 'id_sucursal',
         foreignField: '_id',
         as: 'sucursal'
        }
       }, {
        $unwind: {
         path: '$sucursal'
        }
       }, {
        $unwind: {
         path: '$producto'
        }
       }, {
        $addFields: {
         nombre_producto: '$producto.nombre',
         nombre_sucursal: '$sucursal.nombre',
         diferencia: {
          $subtract: [
           '$cantidad',
           '$cantidad_anterior'
          ]
         }
        }
       }, {
        $project: {
         producto: 0,
         sucursal: 0
        }
       },
       {
        $sort:{
            fecha:-1
        }
       }
    ])
    res.status(200).json(bitacora);

}