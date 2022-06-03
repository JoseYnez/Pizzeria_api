import { Router } from "express";
import * as clienteController from "../controllers/clientes.controller"
import { verifyToken,verifyTokenEmpleado,EmpleadoIsAdmin } from "../middlewares/authjwt";

const router=Router();

//router.post('/createCliente',clienteController.createCliente);
router.get('/',verifyTokenEmpleado,EmpleadoIsAdmin,clienteController.getClientes);
router.get('/:id',verifyTokenEmpleado,EmpleadoIsAdmin,clienteController.getClienteById);
router.get('/getCliente',verifyToken,clienteController.getCliente);
router.put('/updateCliente',verifyToken,clienteController.updateCliente);
router.put('/changePasswd',verifyToken,clienteController.changePassword);
router.delete('/dropCliente',verifyTokenEmpleado,EmpleadoIsAdmin,clienteController.dropClientelById);


export default router;