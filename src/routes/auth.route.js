import { Router } from "express";
import * as authController from "../controllers/auth.controller"

const router=Router();

router.post('/clienteSingIn',authController.clienteSingIn);
router.post('/clienteSingUp',authController.clienteSingUp);

export default router;