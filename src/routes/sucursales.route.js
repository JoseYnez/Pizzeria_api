import { Router } from "express";
import * as sucursalesController from "../controllers/sucursales.controller"
import { verifyToken } from "../middlewares/authjwt";
import { verifyTokenEmpleado,EmpleadoIsAdmin } from "../middlewares/authjwt";

const router=Router();

router.get('/',sucursalesController.getSucursales);
router.get('/:id',sucursalesController.getSucursalById);
router.post('/createSucursal',verifyTokenEmpleado,EmpleadoIsAdmin,sucursalesController.createSucursal);
router.put('/updateSucursal',verifyTokenEmpleado,EmpleadoIsAdmin,sucursalesController.updateSucursalById);
router.delete('/dropSucursal/:id',verifyTokenEmpleado,EmpleadoIsAdmin,sucursalesController.dropSucursalById);

export default router;



/**
 * @swagger
 * tags:
 *  name: Sucursal
 *  description: API para interactuar con las sucursales
 */

/**
 * @swagger
 * paths:
 *  /api/sucursales/:
 *   get:
 *      summary: Muestra todas las sucursales.
 *      tags: [Sucursal]
 *      responses:
 *          200:
 *           description: todas las sucursales
 *           content:
 *            application/json:
 *             schema:
 *              type: array
 *              items:
 *               $ref: '#/components/schemas/sucursalConId'
 */

/**
 * @swagger
 * paths:
 *  /api/sucursales/{sucursalId}:
 *   get:
 *      summary: Muestra una sucursal por id.
 *      tags: [Sucursal]
 *      parameters:
 *       - in: path 
 *         name: sucursalId
 *         type: string
 *         example: 628efef49f06f4dbaa90872f
 *         required: true
 *         description: Numeric ID of the user to get.
 *      responses:
 *          200:
 *           description: todas las sucursales
 *           content:
 *            application/json:
 *             schema:
 *              type: object
 *              $ref: '#/components/schemas/sucursalConId'
 */

 /**
  * @swagger
  * paths:
  *  /api/sucursales/createSucursal:
  *   post:
  *      summary: Crea una sucursal nueva, solo si el empleado tiene rango de admin.
  *      tags: [Sucursal]
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
  *             type: object 
  *             $ref: '#/components/schemas/sucursal'   
  *      responses:
  *       201:
  *        description: Sucursal registrada.
  */
 
 /**
  * @swagger
  * paths:
  *  /api/sucursales/dropSucursal/{sucursalId}:
  *   delete:
  *      summary: Elimina una sucursal con base de id, solo si el empleado tiene rango de admin.
  *      tags: [Sucursal]
  *      parameters:
  *       - in: path
  *         name: sucursalId
  *         type: string
  *         required: true
  *         description: id de la sucursal a obtener.
  *       - name: token
  *         in: header
  *         description: an authorization token
  *         required: true
  *         type: string
  *      responses:
  *        '204':
  *          description: OK
  */

 /**
  * @swagger
  * paths:
  *  /api/sucursales/updateSucursal:
  *   put:
  *      summary: Actualiza una sucursal, solo si el empleado tiene rango de admin.
  *      tags: [Sucursal]
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
  *             type: object 
  *             $ref: '#/components/schemas/sucursalConId'   
  *      responses:
  *       201:
  *        description: Sucursal actualizada.
  */

 ////////////Schemas
/** 
 @swagger
*components:
*  schemas:
*    sucursal:
*      type: object
*      properties:
*        nombre:
*          type: string
*          example: Super pizza norte
*        telefono:
*          type: string
*          example: 4495623120
*        horario_apertura:
*          type: date
*          example: "2018-03-01T19:08:53.555Z"
*        horario_cierre:
*          type: date
*          example: "2018-03-01T19:08:53.555Z"
*        direccion:
*         type: object
*         properties:
*          calle:
*           type: string
*           example: Agua fuerte
*          num_ext:
*           type: string
*           example: 117
*          num_int:
*           type: string
*           example: A
*          colonia:
*           type: string
*           example: Agua clara
*          estado:
*           type: string
*           example: Aguascalientes
*          cp:
*           type: string
*           example: 20920
*      # Both properties are required
*      required:  
*        - id
*        - name
*/

 /** 
 @swagger
*components:
*  schemas:
*    sucursalConId:
*      type: object
*      properties:
*        _id:
*          type: string
*          example: 628efef49f06f4dbaa90872f
*        nombre:
*          type: string
*          example: Super pizza norte
*        telefono:
*          type: string
*          example: 4495623120
*        horario_apertura:
*          type: date
*          example: "2018-03-01T19:08:53.555Z"
*        horario_cierre:
*          type: date
*          example: "2018-03-01T19:08:53.555Z"
*        direccion:
*         type: object
*         properties:
*          calle:
*           type: string
*           example: Agua fuerte
*          num_ext:
*           type: string
*           example: 117
*          num_int:
*           type: string
*           example: A
*          colonia:
*           type: string
*           example: Agua clara
*          estado:
*           type: string
*           example: Aguascalientes
*          cp:
*           type: string
*           example: 20920
*      # Both properties are required
*      required:  
*        - id
*        - name
*/
