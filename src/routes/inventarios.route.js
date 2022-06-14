import { Router } from "express";
import * as inventarioController from "../controllers/inventarios.controller"
import { verifyToken } from "../middlewares/authjwt";
import { EmpleadoIsGerente} from "../middlewares/authjwt";

const router=Router();

router.get('/',EmpleadoIsGerente,inventarioController.getInventarios);
//router.get('/:id',inventarioController.getInventarioById);
//router.post('/',inventarioController.getInventarioByQuery);
//router.post('/createInventario',inventarioController.createInventario);
//router.put('/updateInventario',inventarioController.updateInventarioById);
router.put('/updateInventarios',EmpleadoIsGerente,inventarioController.updateInventario);
router.put('/updateCantidadInventarios',EmpleadoIsGerente,inventarioController.updateCantidadInventario);
router.put('/updateInventarioBySucursal/:id',EmpleadoIsGerente,inventarioController.updateInventarioWithBitacora);
//router.delete('/dropInventario',inventarioController.dropInventarioById);


export default router;

/**
 * @swagger
 * tags:
 *  name: Inventario
 *  description: API para la gestion de enventarios.
 */

/**
 * @swagger
 * paths:
 *  /api/inventarios/: 
 *   get:
 *      summary: Muestra todos los inventarios solo cuando un empleado con rango de admin lo solicita.
 *      tags: [Inventario]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: an authorization token
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *           description: todas los inventarios
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
 *                cantidad:
 *                 type: number
 *                 example: 10
 *                 required: true
 */ 

/**
 * @swagger
 * paths:
 *  /api/inventarios/updateInventarios: 
 *   put:
 *      summary: Modifica los inventarios solo cuando un empleado con rango de gerente lo solicita.
 *      tags: [Inventario]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: an authorization token
 *         required: true
 *         type: string
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *            schema:
 *             type: array
 *             items:
 *              type: object
 *              properties:
 *               id_sucursal:
 *                type: objectId
 *                example: 628e6181f2dff81358711d7e
 *               id_producto:
 *                type: objectId
 *                example: 628e6181f2dff81358711d7e
 *               cantidad:
 *                type: number
 *                example: 10
 *      responses:
 *          204:
 *           description: se agregaron todos los cambios
 */ 

/**
 * @swagger
 * paths:
 *  /api/inventarios/updateCantidadInventarios: 
 *   put:
 *      summary: Modifica los inventarios, sumando la cantidad solo cuando un empleado con rango de gerente lo solicita.
 *      tags: [Inventario]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: an authorization token
 *         required: true
 *         type: string
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *            schema:
 *             type: array
 *             items:
 *              type: object
 *              properties:
 *               id_sucursal:
 *                type: objectId
 *                example: 628e6181f2dff81358711d7e
 *               id_producto:
 *                type: objectId
 *                example: 628e6181f2dff81358711d7e
 *               cantidad:
 *                type: number
 *                example: 10
 *      responses:
 *          204:
 *           description: se agregaron todos los cambios
 */ 

/**
 * @swagger
 * paths:
 *  /api/inventarios/updateInventarioBySucursal/{id}: 
 *   put:
 *      summary: Genera el inventario diario, y actualiza los ingredientes por sucursal, asi como generar la bitacora diaria.
 *      tags: [Inventario]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: an authorization token
 *         required: true
 *         type: string
 *       - name: id
 *         in: path
 *         description: idsucursal
 *         required: true
 *         type: string
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *            schema:
 *             type: array
 *             items:
 *              type: object
 *              properties:
 *               id_producto:
 *                type: objectId
 *                example: 628e6181f2dff81358711d7e
 *               cantidad:
 *                type: number
 *                example: 10
 *      responses:
 *          204:
 *           description: se agregaron todos los cambios
 */ 