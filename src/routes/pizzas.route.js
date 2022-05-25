import { Router } from "express";
import * as pizzaController from "../controllers/pizzas.controller"

const router=Router();

router.get('/',pizzaController.getPizzas);
router.post('/createPizza',pizzaController.createPizza);
router.put('/updatePizza',pizzaController.updatePizzaById);
router.delete('/dropPizza/:id',pizzaController.dropPizzaById);

export default router;