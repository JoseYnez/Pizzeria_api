import { Router } from "express";
import * as productoController from "../controllers/productos.controller"
import { verifyToken } from "../middlewares/authjwt";
const router=Router();

router.get('/',productoController.getProductos);
router.get('/cliente',productoController.getProductosNoI);
router.get('/cliente/:id',productoController.getProductoNoI);
router.get('/:id',verifyToken,productoController.getProducto);
router.post('/createProducto',productoController.createProducto);
router.post('/cantidadSucursal',productoController.getProductoQuery);
router.put('/updateProducto',verifyToken,productoController.updateProductoById);
router.delete('/dropProducto/:id',verifyToken,productoController.dropProductoById);


export default router;