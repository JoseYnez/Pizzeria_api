import { Router } from "express";
import * as empleadoController from "../controllers/empleados.controller"
import { verifyToken } from "../middlewares/authjwt";
import { verifyTokenEmpleado,EmpleadoIsAdmin } from "../middlewares/authjwt";

const router=Router();

router.get('/',verifyTokenEmpleado,empleadoController.getEmpleados);
router.get('/:id',empleadoController.getEmpleadoById);
router.post('/findBySucursales',verifyTokenEmpleado,EmpleadoIsAdmin,empleadoController.getEmpleadoBySucursal);
router.post('/createEmpleado',verifyTokenEmpleado,EmpleadoIsAdmin,empleadoController.createEmpleado);
router.put('/updateEmpleado',verifyTokenEmpleado,empleadoController.updateEmpleadoById);
router.delete('/dropEmpleado',verifyTokenEmpleado,EmpleadoIsAdmin,empleadoController.dropEmpleadolById);


export default router;

/**
 * @swagger
 * tags:
 *  name: AuthEmpleado
 *  description: API para la autenticacion de los empleados
 */

/**
 * @swagger
 * paths:
 *  /api/empleados/: 
 *   get:
 *      summary: Muestra todos los empleados.
 *      tags: [Empleado]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: an authorization token
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *           description: todas las sucursales
 *           content:
 *            application/json:
 *             schema:
 *              type: array
 *              items:
 *               $ref: '#/components/schemas/EmpleadoConId'
 */

/**
 * @swagger
 * paths:
 *  /api/empleados/{empleadoId}:
 *   get:
 *      summary: Muestra un empleado por id.
 *      tags: [Empleado]
 *      parameters:
 *       - in: path 
 *         name: empleadoId
 *         type: string
 *         example: 628efef49f06f4dbaa90872f
 *         required: true
 *         description: ID del empleado a obtener.
 *       - name: token
 *         in: header
 *         description: an authorization token
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *           description: el empleado que se busca
 *           content:
 *            application/json:
 *             schema:
 *              type: object
 *              $ref: '#/components/schemas/EmpleadoConId'
 */

 /**
  * @swagger
  * paths:
  *  /api/empleados/createEmpleado:
  *   post:
  *      summary: Crea un empleado nuevo.
  *      tags: [Empleado]
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
  *             $ref: '#/components/schemas/Empleado'   
  *      responses:
  *       201:
  *        description: Empleado creado.
  */

 /**
  * @swagger
  * paths:
  *  /api/empleados/findBySucursales:
  *   post:
  *      summary: Busca todos los empleados que coincidad con las caracteristicas dadas
  *      tags: [Empleado]
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
  *             properties:
  *              sucursales:
  *               type: array
  *               items:
  *                type: string
  *                example: 628efef49f06f4dbaa90872e
  *              tipos:
  *               type: array
  *               items:
  *                type: string
  *                example: general
  *      responses:
  *       201:
  *        description: Empleado creado.
  */
 
 /**
  * @swagger
  * paths:
  *  /api/empleados/dropEmpleado/{empleadoId}:
  *   delete:
  *      summary: Elimina un empleado con base de id.
  *      tags: [Empleado]
  *      parameters:
  *       - in: path
  *         name: empleadoId
  *         type: string
  *         example: 628efef49f06f4dbaa90872f
  *         required: true
  *         description: ID del empleado a eliminar.
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
  *  /api/empleados/updateEmpleado:
  *   put:
  *      summary: Actualiza un empleado.
  *      tags: [Empleado]
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
  *             $ref: '#/components/schemas/EmpleadoConId'   
  *      responses:
  *       201:
  *        description: empleado actualizada.
  *        content:
  *         application/json:
  *          schema:
  *           type: object
  *           $ref: '#/components/schemas/EmpleadoConId'
  *         
  */

 ////////////Schemas
/** 
 @swagger
*components:
*  schemas:
*    Empleado:
*      type: object
*      properties:
*        tipo:
*          type: string
*          example: general
*        nombre:
*          type: string
*          example: Juan
*        apepat:
*          type: string
*          example: Alvarez
*        apemat:
*          type: string
*          example: Martinez
*        edad:
*          type: number
*          example: 18
*        telefono:
*          type: string
*          example: 4498652316
*        correo:
*          type: string
*          example: ejemplo@ejemplo.com
*        passwd:
*          type: string
*          example: ejemplo
*        curp:
*          type: string
*          example: MLDF55555D5D5D5D51111
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
*        id_sucursal:
*          type: string
*          example: 628efef49f06f4dbaa90872e
*      # Both properties are required
*      required:  
*        - id
*        - name
*/

/** 
 @swagger
*components:
*  schemas:
*    EmpleadoConId:
*      type: object
*      properties:
*        _id:
*          type: string
*          example: 628efef49f06f4dbaa90872f
*        tipo:
*          type: string
*          example: general
*        nombre:
*          type: string
*          example: Juan
*        apepat:
*          type: string
*          example: Alvarez
*        apemat:
*          type: string
*          example: Martinez
*        edad:
*          type: number
*          example: 18
*        telefono:
*          type: string
*          example: 4498652316
*        correo:
*          type: string
*          example: ejemplo@ejemplo.com
*        curp:
*          type: string
*          example: MLDF55555D5D5D5D51111
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
*        id_sucursal:
*          type: string
*          example: 628efef49f06f4dbaa90872e
*      # Both properties are required
*      required:  
*        - id
*        - name
*/