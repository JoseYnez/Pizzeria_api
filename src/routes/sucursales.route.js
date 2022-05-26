import { Router } from "express";
import * as sucursalesController from "../controllers/sucursales.controller"
import { verifyToken } from "../middlewares/authjwt";

const router=Router();

router.get('/',sucursalesController.getSucursales);
router.post('/createSucursal',sucursalesController.createSucursal);
router.put('/updateSucursal',sucursalesController.updateSucursalById);
router.delete('/dropSucursal/:id',sucursalesController.dropSucursalById);

export default router;

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
 *               $ref: '#/components/schemas/sucursal'
 */

 /**
  * @swagger
  * paths:
  *  /api/sucursales/createSucursal:
  *   post:
  *      summary: Crea una sucursal nueva.
  *      tags: [Sucursal]
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
  *      summary: Elimina una sucursal con base de id.
  *      tags: [Sucursal]
  *      parameters:
  *       - in: path
  *         name: sucursalId
  *         type: string
  *         required: true
  *         description: Numeric ID of the user to get.
  *      responses:
  *        '204':
  *          description: OK
  */

 /**
  * @swagger
  * paths:
  *  /api/sucursales/updateSucursal:
  *   put:
  *      summary: Actualiza una sucursal.
  *      tags: [Sucursal]
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
