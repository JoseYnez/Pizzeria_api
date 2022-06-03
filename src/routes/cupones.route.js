import { Router } from "express";
import * as cuponController from "../controllers/cupones.controller"
import { verifyTokenEmpleado,EmpleadoIsAdmin,EmpleadoIsGerente} from "../middlewares/authjwt";

const router=Router();

router.get('/',EmpleadoIsGerente,cuponController.getCupones);
router.get('/validCupones',cuponController.getValidCupones);
router.post('/createCupon',EmpleadoIsAdmin,cuponController.createCupon);
router.put('/updateCupon',EmpleadoIsAdmin,cuponController.updateCuponById);
router.delete('/dropCupon/:id',EmpleadoIsAdmin,cuponController.dropCuponById);

export default router;

/**
 * @swagger
 * tags:
 *  name: Cupones
 *  description: API para la gestion de los cupones
 */

/**
 * @swagger
 * paths:
 *  /api/cupones/: 
 *   get:
 *      summary: Muestra todos los cupones, cuando un gerente o superior los solicita.
 *      tags: [Cupones]
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
 *               type: object
 *               properties:
 *                _id:
 *                 type: string
 *                 example: 628b24b51870e03f354f51a1
 *                 required: true
 *                tipo:
 *                 type: string
 *                 example: descuento
 *                 required: true
 *                titulo:
 *                 type: string
 *                 example: 2x1
 *                 required: true
 *                restricciones:
 *                 type: string
 *                 example: Solo valido en pizzas grandes
 *                 required: true
 *                imgURL:
 *                 type: string
 *                 example: www.img.png
 *                 required: true
 *                vencimiento:
 *                 type: date
 *                 example: 
 *                 required: true
 *                rest_pizza:
 *                 type: array
 *                 items:
 *                  type: object
 *                  properties:
 *                   nombre:
 *                    type: array
 *                    items:
 *                     type: string
 *                   categoria:
 *                    type: array
 *                    items:
 *                     type: string
 *                   tamaño:
 *                    type: array
 *                    items:
 *                     type: string
 *                   min_ingredientes:
 *                    type: number
 *                    example: 0
 *                   max_ingredientes:
 *                    type: number
 *                    example: 5
 *                   descuento:
 *                    type: number
 *                    example: 0
 *                rest_producto:
 *                 type: array
 *                 items:
 *                  type: object
 *                  properties:
 *                   nombre:
 *                    type: array
 *                    items:
 *                     type: string
 *                   marca:
 *                    type: array
 *                    items:
 *                     type: string
 *                   tipo:
 *                    type: array
 *                    items:
 *                     type: string
 *                   contenido:
 *                    type: number
 *                    example: 1
 *                   medida:
 *                    type: string
 *                    example: litro
 *                   descuento:
 *                    type: number
 *                    example: 0
 */

/**
 * @swagger
 * paths:
 *  /api/cupones/validCupones: 
 *   get:
 *      summary: Muestra todos los cupones validos por fecha.
 *      tags: [Cupones]
 *      responses:
 *          200:
 *           description: todas las sucursales
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
 *                tipo:
 *                 type: string
 *                 example: descuento
 *                 required: true
 *                titulo:
 *                 type: string
 *                 example: 2x1
 *                 required: true
 *                restricciones:
 *                 type: string
 *                 example: Solo valido en pizzas grandes
 *                 required: true
 *                imgURL:
 *                 type: string
 *                 example: www.img.png
 *                 required: true
 *                vencimiento:
 *                 type: date
 *                 example: 
 *                 required: true
 *                rest_pizza:
 *                 type: array
 *                 items:
 *                  type: object
 *                  properties:
 *                   nombre:
 *                    type: array
 *                    items:
 *                     type: string
 *                   categoria:
 *                    type: array
 *                    items:
 *                     type: string
 *                   tamaño:
 *                    type: array
 *                    items:
 *                     type: string
 *                   min_ingredientes:
 *                    type: number
 *                    example: 0
 *                   max_ingredientes:
 *                    type: number
 *                    example: 5
 *                   descuento:
 *                    type: number
 *                    example: 0
 *                rest_producto:
 *                 type: array
 *                 items:
 *                  type: object
 *                  properties:
 *                   nombre:
 *                    type: array
 *                    items:
 *                     type: string
 *                   marca:
 *                    type: array
 *                    items:
 *                     type: string
 *                   tipo:
 *                    type: array
 *                    items:
 *                     type: string
 *                   contenido:
 *                    type: number
 *                    example: 1
 *                   medida:
 *                    type: string
 *                    example: litro
 *                   descuento:
 *                    type: number
 *                    example: 0
 */

/**
 * @swagger
 * paths:
 *  /api/cupones/createCupon: 
 *   post:
 *      summary: Crea un cupon, cuando un empleado admin lo hace.
 *      tags: [Cupones]
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
 *              tipo:
 *               type: string
 *               example: descuento
 *               required: true
 *              titulo:
 *               type: string
 *               example: 2x1
 *               required: true
 *              restricciones:
 *               type: string
 *               example: Solo valido en pizzas grandes
 *               required: true
 *              imgURL:
 *               type: string
 *               example: www.img.png
 *               required: true
 *              vencimiento:
 *               type: date
 *               example: 
 *               required: true
 *              rest_pizza:
 *               type: array
 *               items:
 *                type: object
 *                properties:
 *                 nombre:
 *                  type: array
 *                  items:
 *                   type: string
 *                 categoria:
 *                  type: array
 *                  items:
 *                   type: string
 *                 tamaño:
 *                  type: array
 *                  items:
 *                   type: string
 *                 min_ingredientes:
 *                  type: number
 *                  example: 0
 *                 max_ingredientes:
 *                  type: number
 *                  example: 5
 *                 descuento:
 *                  type: number
 *                  example: 0
 *              rest_producto:
 *               type: array
 *               items:
 *                type: object
 *                properties:
 *                 nombre:
 *                  type: array
 *                  items:
 *                   type: string
 *                 marca:
 *                  type: array
 *                  items:
 *                   type: string
 *                 tipo:
 *                  type: array
 *                  items:
 *                   type: string
 *                 contenido:
 *                  type: number
 *                  example: 1
 *                 medida:
 *                  type: string
 *                  example: litro
 *                 descuento:
 *                  type: number
 *                  example: 0
 *      responses:
 *          201:
 *           description: se creo el cupon
 *           content:
 *            application/json:
 *             schema:
 */

/**
 * @swagger
 * paths:
 *  /api/cupones/updateCupon: 
 *   put:
 *      summary: Actualiza un cupon, cuando un empleado admin lo hace.
 *      tags: [Cupones]
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
 *              _id:
 *               type: string
 *               example: 628b24b51870e03f354f51a1
 *               required: true
 *              tipo:
 *               type: string
 *               example: descuento
 *               required: true
 *              titulo:
 *               type: string
 *               example: 2x1
 *               required: true
 *              restricciones:
 *               type: string
 *               example: Solo valido en pizzas grandes
 *               required: true
 *              imgURL:
 *               type: string
 *               example: www.img.png
 *               required: true
 *              vencimiento:
 *               type: date
 *               example: 
 *               required: true
 *              rest_pizza:
 *               type: array
 *               items:
 *                type: object
 *                properties:
 *                 nombre:
 *                  type: array
 *                  items:
 *                   type: string
 *                 categoria:
 *                  type: array
 *                  items:
 *                   type: string
 *                 tamaño:
 *                  type: array
 *                  items:
 *                   type: string
 *                 min_ingredientes:
 *                  type: number
 *                  example: 0
 *                 max_ingredientes:
 *                  type: number
 *                  example: 5
 *                 descuento:
 *                  type: number
 *                  example: 0
 *              rest_producto:
 *               type: array
 *               items:
 *                type: object
 *                properties:
 *                 nombre:
 *                  type: array
 *                  items:
 *                   type: string
 *                 marca:
 *                  type: array
 *                  items:
 *                   type: string
 *                 tipo:
 *                  type: array
 *                  items:
 *                   type: string
 *                 contenido:
 *                  type: number
 *                  example: 1
 *                 medida:
 *                  type: string
 *                  example: litro
 *                 descuento:
 *                  type: number
 *                  example: 0
 *      responses:
 *          201:
 *           description: se creo el cupon
 *           content:
 *            application/json:
 *             schema:
 */

/**
 * @swagger
 * paths:
 *  /api/cupones/dropCupon/{cuponId}: 
 *   delete:
 *      summary: Actualiza un cupon, cuando un empleado admin lo hace.
 *      tags: [Cupones]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: an authorization token
 *         required: true
 *         type: string
 *       - in: path
 *         name: cuponId
 *         type: string
 *         example: 628efef49f06f4dbaa90872f
 *         required: true
 *         description: ID del cupon a eliminar.
 *      responses:
 *          204:
 *           description: se elimino el cupon
 *           content:
 *            application/json:
 *             schema:
 *          404:
 *           description: no se elimino el cupon
 *           content:
 *            application/json:
 *             schema:
 */