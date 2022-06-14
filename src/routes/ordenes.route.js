import { Router } from "express";
import * as ordenesController from "../controllers/ordenes.controller"
import { verifyTokenEmpleado,EmpleadoIsAdmin,EmpleadoIsGerente,verifyToken} from "../middlewares/authjwt";

const router=Router();

router.get('/',verifyTokenEmpleado,ordenesController.getOrdenes);
router.post('/createOrden',verifyToken,ordenesController.createOrden);
router.post('/validarOrden',verifyToken,ordenesController.validarOrden);

export default router;
/**
 * @swagger
 * tags:
 *  name: Ordenes
 *  description: API para la gestion de ordenes.
 */

/**
 * @swagger
 * paths:
 *  /api/ordenes/: 
 *   get:
 *      summary: Muestra todas las ordenes cuando un admin lo solicita.
 *      tags: [Ordenes]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: an authorization token
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *           description: todas las ordenes
 *           content:
 *            application/json:
 *             schema:
 *              type: array
 *              items:
 *               type: object
 *               properties:
 *                _id:
 *                 type: ObjectId
 *                 example: 628b24b51870e03f354f51a1
 *                 required: true
 *                total:
 *                 type: number
 *                 example: 596
 *                 required: true
 *                estado:
 *                 type: string
 *                 example: generado
 *                 required: true
 *                fecha:
 *                 type: date
 *                 example: 
 *                 required: true
 *                id_cliente:
 *                 type: ObjectId
 *                 example: 628b24b51870e03f354f51a1
 *                 required: true
 *                id_cupon:
 *                 type: ObjectId
 *                 example: 628b24b51870e03f354f51a1
 *                 required: true
 *                id_empleado:
 *                 type: ObjectId
 *                 example: 628b24b51870e03f354f51a1
 *                 required: true
 *                id_sucursal:
 *                 type: ObjectId
 *                 example: 628b24b51870e03f354f51a1
 *                 required: true
 *                pizzas:
 *                 type: array
 *                 items:
 *                  type: object
 *                  properties:
 *                   _id:
 *                    type: ObjectId
 *                    example: 628b24b51870e03f354f51a1
 *                    required: true
 *                   nombre:
 *                    type: string
 *                    example: suprema
 *                    required: true
 *                   precio:
 *                    type: number
 *                    example: 250
 *                    required: true
 *                   categoria:
 *                    type: string
 *                    example: especiales
 *                    required: true
 *                   id_pizza:
 *                    type: ObjectId
 *                    example: 628b24b51870e03f354f51a1
 *                    required: true
 *                   info:
 *                    type: array
 *                    items:
 *                     type: object
 *                     properties:
 *                      _id:
 *                       type: ObjectId
 *                       example: 628b24b51870e03f354f51a1
 *                       required: true
 *                      tamaño:
 *                       type: string
 *                       example: grande
 *                       required: true
 *                      precio:
 *                       type: number
 *                       example: 200
 *                       required: true
 *                      ingredeintes:
 *                       type: array
 *                       items:
 *                        type: object
 *                        $ref: '#/components/schemas/relacionIngrediente'  
 *                productos:
 *                 type: array
 *                 items:
 *                  type: object
 *                  properties:
 *                   _id:
 *                    type: ObjectId
 *                    example: 628b24b51870e03f354f51a1
 *                    required: true
 *                   id_producto:
 *                    type: ObjectId
 *                    example: 628b24b51870e03f354f51a1
 *                    required: true
 *                   nombre:
 *                    type: string
 *                    example: coca
 *                    required: true
 *                   cantidad:
 *                    type: number
 *                    example: 2
 *                    required: true
 *                   precio:
 *                    type: number
 *                    example: 50
 *                    required: true
 */ 

/**
 * @swagger
 * paths:
 *  /api/ordenes/createOrden: 
 *   post:
 *      summary: crea una orden y la asigna a un empleado si el token del cliente es valido.
 *      tags: [Ordenes]
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
 *               total:
 *                type: number
 *                example: 596
 *               id_cliente:
 *                type: ObjectId
 *                example: 628b24b51870e03f354f51a1
 *                required: true
 *               id_cupon:
 *                type: ObjectId
 *                example: 628b24b51870e03f354f51a1
 *                required: true
 *               id_sucursal:
 *                type: ObjectId
 *                example: 628b24b51870e03f354f51a1
 *                required: true
 *               pizzas:
 *                type: array
 *                items:
 *                 type: object
 *                 properties:
 *                  nombre:
 *                   type: string
 *                   example: suprema
 *                  precio:
 *                   type: number
 *                   example: 250
 *                  categoria:
 *                   type: string
 *                   example: especiales
 *                  id_pizza:
 *                   type: ObjectId
 *                   example: 628b24b51870e03f354f51a1
 *                  info:
 *                   type: object
 *                   properties:
 *                    tamaño:
 *                     type: string
 *                     example: grande
 *                    precio:
 *                     type: number
 *                     example: 200
 *                    ingredientes:
 *                     type: array
 *                     items:
 *                      type: object
 *                      $ref: '#/components/schemas/relacionIngrediente'  
 *               productos:
 *                type: array
 *                items:
 *                 type: object
 *                 properties:
 *                  _id:
 *                   type: ObjectId
 *                   example: 628b24b51870e03f354f51a1
 *                   required: true
 *                  id_producto:
 *                   type: ObjectId
 *                   example: 628b24b51870e03f354f51a1
 *                   required: true
 *                  nombre:
 *                   type: string
 *                   example: coca
 *                   required: true
 *                  cantidad:
 *                   type: number
 *                   example: 2
 *                   required: true
 *                  precio:
 *                   type: number
 *                   example: 50
 *                   required: true
 *      responses:
 *          200:
 *           description: todas las ordenes
 *           content:
 *            application/json:
 *             schema:
 *              type: object
 *              properties:
 *               creado:
 *                type: boolean
 *                example: true
 *               pizzas:
 *                type: array
 *                items:
 *                 type: number
 *                 example: 0
 *               productos:
 *                type: array
 *                items:
 *                  type: number
 *                  example: 0
 *               cupon:
 *                type: boolean
 *                example: true
 *                  
 */ 

/**
 * @swagger
 * paths:
 *  /api/ordenes/validarOrden: 
 *   post:
 *      summary: valida una orden  si el token del cliente es valido.
 *      tags: [Ordenes]
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
 *               total:
 *                type: number
 *                example: 596
 *               id_cliente:
 *                type: ObjectId
 *                example: 628b24b51870e03f354f51a1
 *                required: true
 *               id_cupon:
 *                type: ObjectId
 *                example: 628b24b51870e03f354f51a1
 *                required: true
 *               id_sucursal:
 *                type: ObjectId
 *                example: 628b24b51870e03f354f51a1
 *                required: true
 *               pizzas:
 *                type: array
 *                items:
 *                 type: object
 *                 properties:
 *                  nombre:
 *                   type: string
 *                   example: suprema
 *                  precio:
 *                   type: number
 *                   example: 250
 *                  categoria:
 *                   type: string
 *                   example: especiales
 *                  id_pizza:
 *                   type: ObjectId
 *                   example: 628b24b51870e03f354f51a1
 *                  info:
 *                   type: object
 *                   properties:
 *                    tamaño:
 *                     type: string
 *                     example: grande
 *                    precio:
 *                     type: number
 *                     example: 200
 *                    ingredientes:
 *                     type: array
 *                     items:
 *                      type: object
 *                      $ref: '#/components/schemas/relacionIngrediente'  
 *               productos:
 *                type: array
 *                items:
 *                 type: object
 *                 properties:
 *                  _id:
 *                   type: ObjectId
 *                   example: 628b24b51870e03f354f51a1
 *                   required: true
 *                  id_producto:
 *                   type: ObjectId
 *                   example: 628b24b51870e03f354f51a1
 *                   required: true
 *                  nombre:
 *                   type: string
 *                   example: coca
 *                   required: true
 *                  cantidad:
 *                   type: number
 *                   example: 2
 *                   required: true
 *                  precio:
 *                   type: number
 *                   example: 50
 *                   required: true
 *      responses:
 *          200:
 *           description: todas las ordenes
 *           content:
 *            application/json:
 *             schema:
 *              type: object
 *              properties:
 *               creado:
 *                type: boolean
 *                example: true
 *               pizzas:
 *                type: array
 *                items:
 *                 type: number
 *                 example: 0
 *               productos:
 *                type: array
 *                items:
 *                  type: number
 *                  example: 0
 *               cupon:
 *                type: boolean
 *                example: true
 *                  
 */ 