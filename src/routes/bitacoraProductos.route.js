import { Router } from "express";
import * as bitacoraController from "../controllers/bitacoraProductos.controller"
import { EmpleadoIsAdmin} from "../middlewares/authjwt";

const router=Router();

router.get('/',EmpleadoIsAdmin,bitacoraController.getBitacoras);

export default router;

/**
 * @swagger
 * tags:
 *  name: BitacoraProductos
 *  description: API para la gestion de los cupones
 */

/**
 * @swagger
 * paths:
 *  /api/bitacoraProductos/: 
 *   get:
 *      summary: Muestra todas las bitacoras, cuando un admin los solicita.
 *      tags: [BitacoraProductos]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: an authorization token
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *           description: todas las bitacoras
 *           content:
 *            application/json:
 *             schema:
 *              type: array
 *              items:
 *               type: object
 *               properties:
 *                _id:
 *                 type: string
 *                 example: 628b24b51870e03f354f51a1
 *                 required: true
 *                id_sucursal:
 *                 type: string
 *                 example: Queso motzarela
 *                 required: true
 *                id_producto:
 *                 type: string
 *                 example: Caperucita
 *                 required: true
 *                cantidad_anterior:
 *                 type: number
 *                 example: 10
 *                 required: true
 *                cantidad:
 *                 type: number
 *                 example: 20
 *                 required: true
 *                fecha:
 *                 type: date
 *                 example: 2022-06-14T18:48:38.739+00:00
 *                 required: true
 *                nombre_producto:
 *                 type: string
 *                 example: Queso
 *                 required: true
 *                nombre_sucursal:
 *                 type: string
 *                 example: Sucursal 1
 *                 required: true
 *                diferencia:
 *                 type: number
 *                 example: 10
 *                 required: true
 */