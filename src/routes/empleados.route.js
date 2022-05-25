import { Router } from "express";
import * as empleadoController from "../controllers/empleados.controller"
import { verifyToken } from "../middlewares/authjwt";

const router=Router();

router.get('/',empleadoController.getEmpleados);
router.get('/:id',empleadoController.getEmpleadoById);
router.post('/createEmpleado',empleadoController.createEmpleado);
router.put('/updateEmpleado',empleadoController.updateEmpleadoById);
router.delete('/dropEmpleado',empleadoController.dropEmpleadolById);


export default router;