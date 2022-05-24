import { Router } from "express";
import * as cuponController from "../controllers/cupones.controller"

const router=Router();

router.get('/',cuponController.getCupones);
router.post('/createCupon',cuponController.createCupon);
router.put('/updateCupon',cuponController.updateCuponById);
router.delete('/dropCupon/:id',cuponController.dropCuponById);

export default router;