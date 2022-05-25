import { Router } from "express";
import * as sucursalesController from "../controllers/sucursales.controller"
import { verifyToken } from "../middlewares/authjwt";

const router=Router();

router.get('/',sucursalesController.getSucursales);
router.post('/createSucursal',sucursalesController.createSucursal);
router.put('/updateSucursal',sucursalesController.updateSucursalById);
router.delete('/dropSucursal',sucursalesController.dropSucursalById);


export default router;