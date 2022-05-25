import { Router } from "express";
import * as inventarioController from "../controllers/inventarios.controller"
import { verifyToken } from "../middlewares/authjwt";

const router=Router();

router.get('/',inventarioController.getInventarios);
router.post('/',inventarioController.getInventarioByQuery);
router.get('/:id',inventarioController.getInventarioById);
router.post('/createInventario',inventarioController.createInventario);
router.put('/updateInventario',inventarioController.updateInventarioById);
router.delete('/dropInventario',inventarioController.dropInventarioById);


export default router;