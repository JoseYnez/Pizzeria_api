import { Router } from "express";
import * as ordenesController from "../controllers/ordenes.controller"

const router=Router();

router.get('/',ordenesController.getOrdenes);
router.post('/createOrden',ordenesController.createOrden);
router.put('/updateOrden',ordenesController.updateOrdenById);
router.delete('/dropOrden/:id',ordenesController.dropOrdenById);

export default router;