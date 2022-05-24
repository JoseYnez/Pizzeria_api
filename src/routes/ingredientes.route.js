import { Router } from "express";
import * as ingredientesController from "../controllers/ingredientes.controller"

const router=Router();

router.get('/',ingredientesController.getIngredientes);
router.post('/createIngrediente',ingredientesController.createIngrediente);
router.put('/updateIngrediente',ingredientesController.updateIngredienteById);
router.delete('/dropIngrediente/:id',ingredientesController.dropIngredienteById);

export default router;