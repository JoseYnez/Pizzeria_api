import { Router } from "express";
import * as clienteController from "../controllers/clientes.controller"
import { verifyToken,verifyTokenEmpleado,EmpleadoIsAdmin } from "../middlewares/authjwt";
const router=Router();

router.get('/',EmpleadoIsAdmin,clienteController.getClientes);
router.get('/:id',EmpleadoIsAdmin,clienteController.getClienteById);
router.post('/obtenerCliente',verifyToken,clienteController.getCliente);
router.put('/updateCliente',verifyToken,clienteController.updateCliente);
router.put('/changePasswd',verifyToken,clienteController.changePassword);
router.delete('/dropCliente',verifyTokenEmpleado,EmpleadoIsAdmin,clienteController.dropClientelById);


export default router;

/**
 * @swagger
 * tags:
 *  name: Cliente
 *  description: API para la interaccion clientes
 */

/**
 * @swagger
 * paths:
 *  /api/clientes/: 
 *   get:
 *      summary: Muestra todos los clientes solo cuando un empleado con rango de admin lo solicita.
 *      tags: [Cliente]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: an authorization token
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *           description: todas los empleados
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
 *                nombre:
 *                 type: string
 *                 example: Maria
 *                 required: true
 *                apepat:
 *                 type: string
 *                 example: Diaz
 *                 required: true
 *                apemat:
 *                 type: string
 *                 example: Martinez
 *                 required: true
 *                cumpleaños:
 *                 type: date
 *                 example:
 *                 required: true
 *                telefono:
 *                 type: string
 *                 example: 4491234567
 *                 required: true
 *                correo:
 *                 type: string
 *                 example: ejemplo@ejemplo.com
 *                 required: true
 *                direcciones:
 *                 type: array
 *                 items:
 *                  type: object
 *                  properties:
 *                   calle:
 *                    type: string
 *                    example: Agua fuerte
 *                   num_ext:
 *                    type: string
 *                    example: 117
 *                   num_int:
 *                    type: string
 *                    example: A
 *                   colonia:
 *                    type: string
 *                    example: Agua clara
 *                   estado:
 *                    type: string
 *                    example: Aguascalientes
 *                   cp:
 *                    type: string
 *                    example: 20920
 *                cupones:
 *                 type: array
 *                 items:
 *                  type: object
 *                  properties:
 *                   id_cupon:
 *                    type: string
 *                    example: 628b24b51870e03f354f51a1
 *                   cantidad:
 *                    type: number
 *                    example: 3
 *                   _id:
 *                    type: string
 *                    example: 628b24b51870e03f354f51a1
 */ 

/**
 * @swagger
 * paths:
 *  /api/clientes/{clienteId}: 
 *   get:
 *      summary: Muestra todos los clientes solo cuando un empleado con rango de admin lo solicita.
 *      tags: [Cliente]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: an authorization token
 *         required: true
 *         type: string
 *       - in: path 
 *         name: clienteId
 *         type: string
 *         example: 628efef49f06f4dbaa90872f
 *         required: true
 *         description: ID del cliente a obtener.
 *      responses:
 *          200:
 *           description: todas los empleados
 *           content:
 *            application/json:
 *             schema:
 *              type: object
 *              properties:
 *               _id:
 *                type: string
 *                example: 628b24b51870e03f354f51a1
 *                required: true
 *               nombre:
 *                type: string
 *                example: Maria
 *                required: true
 *               apepat:
 *                type: string
 *                example: Diaz
 *                required: true
 *               apemat:
 *                type: string
 *                example: Martinez
 *                required: true
 *               cumpleaños:
 *                type: date
 *                example: 
 *                required: true
 *               telefono:
 *                type: string
 *                example: 4491234567
 *                required: true
 *               correo:
 *                type: string
 *                example: ejemplo@ejemplo.com
 *                required: true
 *               direcciones:
 *                type: array
 *                items:
 *                 type: object
 *                 properties:
 *                  calle:
 *                   type: string
 *                   example: Agua fuerte
 *                  num_ext:
 *                   type: string
 *                   example: 117
 *                  num_int:
 *                   type: string
 *                   example: A
 *                  colonia:
 *                   type: string
 *                   example: Agua clara
 *                  estado:
 *                   type: string
 *                   example: Aguascalientes
 *                  cp:
 *                   type: string
 *                   example: 20920
 *               cupones:
 *                type: array
 *                items:
 *                 type: object
 *                 properties:
 *                  id_cupon:
 *                   type: string
 *                   example: 628b24b51870e03f354f51a1
 *                  cantidad:
 *                   type: number
 *                   example: 3
 *                  _id:
 *                   type: string
 *                   example: 628b24b51870e03f354f51a1
 */

/**
 * @swagger
 * paths:
 *  /api/clientes/obtenerCliente: 
 *   post:
 *      summary: Muestra la informacion del cliente al que pertenece el token.
 *      tags: [Cliente]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: an authorization token
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *           description: el cliente
 *           content:
 *            application/json:
 *             schema:
 *              type: object
 *              properties:
 *               _id:
 *                type: string
 *                example: 628b24b51870e03f354f51a1
 *                required: true
 *               nombre:
 *                type: string
 *                example: Maria
 *                required: true
 *               apepat:
 *                type: string
 *                example: Diaz
 *                required: true
 *               apemat:
 *                type: string
 *                example: Martinez
 *                required: true
 *               cumpleaños:
 *                type: date
 *                example: 
 *                required: true
 *               telefono:
 *                type: string
 *                example: 4491234567
 *                required: true
 *               correo:
 *                type: string
 *                example: ejemplo@ejemplo.com
 *                required: true
 *               direcciones:
 *                type: array
 *                items:
 *                 type: object
 *                 properties:
 *                  calle:
 *                   type: string
 *                   example: Agua fuerte
 *                  num_ext:
 *                   type: string
 *                   example: 117
 *                  num_int:
 *                   type: string
 *                   example: A
 *                  colonia:
 *                   type: string
 *                   example: Agua clara
 *                  estado:
 *                   type: string
 *                   example: Aguascalientes
 *                  cp:
 *                   type: string
 *                   example: 20920
 *               cupones:
 *                type: array
 *                items:
 *                 type: object
 *                 properties:
 *                  id_cupon:
 *                   type: string
 *                   example: 628b24b51870e03f354f51a1
 *                  cantidad:
 *                   type: number
 *                   example: 3
 *                  _id:
 *                   type: string
 *                   example: 628b24b51870e03f354f51a1
 */

/**
 * @swagger
 * paths:
 *  /api/clientes/updateCliente: 
 *   put:
 *      summary: Actualiza la informacion del cliente si el token coincide.
 *      tags: [Cliente]
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
 *              type: object
 *              properties:
 *               _id:
 *                type: string
 *                example: 628b24b51870e03f354f51a1
 *                required: true
 *               telefono:
 *                type: string
 *                example: 4491234567
 *                required: true
 *               direcciones:
 *                type: array
 *                items:
 *                 type: object
 *                 properties:
 *                  calle:
 *                   type: string
 *                   example: Agua fuerte
 *                  num_ext:
 *                   type: string
 *                   example: 117
 *                  num_int:
 *                   type: string
 *                   example: A
 *                  colonia:
 *                   type: string
 *                   example: Agua clara
 *                  estado:
 *                   type: string
 *                   example: Aguascalientes
 *                  cp:
 *                   type: string
 *                   example: 20920
 *      responses:
 *          200:
 *           description: todas los empleados
 *           content:
 *            application/json:
 *             schema:
 *              type: object
 *              properties:
 *               _id:
 *                type: string
 *                example: 628b24b51870e03f354f51a1
 *                required: true
 *               nombre:
 *                type: string
 *                example: Maria
 *                required: true
 *               apepat:
 *                type: string
 *                example: Diaz
 *                required: true
 *               apemat:
 *                type: string
 *                example: Martinez
 *                required: true
 *               cumpleaños:
 *                type: date
 *                example: 
 *                required: true
 *               telefono:
 *                type: string
 *                example: 4491234567
 *                required: true
 *               correo:
 *                type: string
 *                example: ejemplo@ejemplo.com
 *                required: true
 *               direcciones:
 *                type: array
 *                items:
 *                 type: object
 *                 properties:
 *                  calle:
 *                   type: string
 *                   example: Agua fuerte
 *                  num_ext:
 *                   type: string
 *                   example: 117
 *                  num_int:
 *                   type: string
 *                   example: A
 *                  colonia:
 *                   type: string
 *                   example: Agua clara
 *                  estado:
 *                   type: string
 *                   example: Aguascalientes
 *                  cp:
 *                   type: string
 *                   example: 20920
 *               cupones:
 *                type: array
 *                items:
 *                 type: object
 *                 properties:
 *                  id_cupon:
 *                   type: string
 *                   example: 628b24b51870e03f354f51a1
 *                  cantidad:
 *                   type: number
 *                   example: 3
 *                  _id:
 *                   type: string
 *                   example: 628b24b51870e03f354f51a1
 */

/**
 * @swagger
 * paths:
 *  /api/clientes/changePasswd: 
 *   put:
 *      summary: Cambia la clave del cliente si coincide el token y la clave.
 *      tags: [Cliente]
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
 *              type: object
 *              properties:
 *               _id:
 *                type: string
 *                example: 628b24b51870e03f354f51a1
 *                required: true
 *               passwd:
 *                type: string
 *                example: clave
 *                required: true
 *               passwdn:
 *                type: string
 *                example: clave
 *                required: true
 *      responses:
 *          201:
 *           description: correcto
 */