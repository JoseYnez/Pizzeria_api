import { Router } from "express";
import * as authController from "../controllers/authEmpleado.controller"

const router=Router();

router.post('/EmpleadoSingIn',authController.EmpleadoSingIn);
router.post('/EmpleadoSingUp',authController.EmpleadoSingUp);

export default router;