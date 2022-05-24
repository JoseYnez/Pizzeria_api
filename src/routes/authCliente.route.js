import { Router } from "express";
import * as authController from "../controllers/authCliente.controller"

const router=Router();

router.post('/clienteSingIn',authController.clienteSingIn);
router.post('/clienteSingUp',authController.clienteSingUp);

export default router;