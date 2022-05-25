import { Router } from "express";
import * as clienteController from "../controllers/clientes.controller"
import { verifyToken } from "../middlewares/authjwt";

const router=Router();

router.get('/',clienteController.getClientes);
router.get('/:id',clienteController.getClienteById);
router.post('/createCliente',clienteController.createCliente);
router.put('/updateCliente',clienteController.updateClienteById);
router.delete('/dropCliente',clienteController.dropClientelById);


export default router;