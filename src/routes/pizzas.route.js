import { Router } from "express";
import * as pizzaController from "../controllers/pizzas.controller"
import { verifyTokenEmpleado,EmpleadoIsAdmin,EmpleadoIsGerente} from "../middlewares/authjwt";

const router=Router();

router.get('/',pizzaController.getPizzas);
router.post('/createPizza',EmpleadoIsAdmin,pizzaController.createPizza);
router.put('/updatePizza',EmpleadoIsAdmin,pizzaController.updatePizzaById);
router.delete('/dropPizza/:id',EmpleadoIsAdmin,pizzaController.dropPizzaById);

export default router;

/**
 * @swagger
 * tags:
 *  name: Pizzas
 *  description: API para la gestion de pizzas.
 */

/**
 * @swagger
 * paths:
 *  /api/pizzas/: 
 *   get:
 *      summary: Muestra todas las pizzas.
 *      tags: [Pizzas]
 *      responses:
 *          200:
 *           description: todas los tipos de pizzas
 *           content:
 *            application/json:
 *             schema:
 *              type: array
 *              items:
 *               type: object
 *               properties:
 *                _id:
 *                 type: ObjectId
 *                 example: 62a264bb37165f1be68ed829
 *                 required: true
 *                nombre:
 *                 type: string
 *                 example: suprema
 *                 required: true
 *                categoria:
 *                 type: string
 *                 example: especiales
 *                 required: true
 *                imgUrl:
 *                 type: string
 *                 example: www.img.jpg
 *                 required: true
 *                calificacion:
 *                 type: number
 *                 example: 0
 *                 required: true
 *                tamaños:
 *                 type: array
 *                 items:
 *                  type: object
 *                  $ref: '#/components/schemas/tamaños'  
 * 
 */ 

/**
 * @swagger
 * paths:
 *  /api/pizzas/createPizza: 
 *   post:
 *      summary: Muestra todas las pizzas.
 *      tags: [Pizzas]
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
 *              nombre:
 *               type: string
 *               example: suprema
 *               required: true
 *              categoria:
 *               type: string
 *               example: especiales
 *               required: true
 *              imgUrl:
 *               type: string
 *               example: www.img.jpg
 *               required: true
 *              calificacion:
 *               type: number
 *               example: 0
 *               required: true
 *              tamaños:
 *               type: array
 *               items:
 *                type: object
 *                $ref: '#/components/schemas/tamaños'
 *      responses:
 *          201:
 *           description: creacion de pizza
 * 
 */ 

/**
 * @swagger
 * paths:
 *  /api/pizzas/updatePizza: 
 *   put:
 *      summary: Muestra todas las pizzas.
 *      tags: [Pizzas]
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
 *               type: ObjectId
 *               example: 62a264bb37165f1be68ed829
 *               required: true
 *              nombre:
 *               type: string
 *               example: suprema
 *               required: true
 *              categoria:
 *               type: string
 *               example: especiales
 *               required: true
 *              imgUrl:
 *               type: string
 *               example: www.img.jpg
 *               required: true
 *              calificacion:
 *               type: number
 *               example: 0
 *               required: true
 *              tamaños:
 *               type: array
 *               items:
 *                type: object
 *                $ref: '#/components/schemas/tamaños'
 *      responses:
 *          201:
 *           description: creacion de pizza
 * 
 */ 

/**
 * @swagger
 * paths:
 *  /api/pizzas/dropPizza/{pizzaId}: 
 *   delete:
 *      summary: Elimina ingredientes por id.
 *      tags: [Pizzas]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: an authorization token
 *         required: true
 *         type: string
 *       - in: path 
 *         name: pizzaId
 *         type: string
 *         example: 628efef49f06f4dbaa90872f
 *         required: true
 *         description: ID del producto a obtener.
 *      responses:
 *          204:
 *           description: producto eliminado
 */ 
/*
 *       - name: token
 *         in: header
 *         description: an authorization token
 *         required: true
 *         type: string
 * */


/** 
 @swagger
*components:
*  schemas:
*   tamaños:
*    type: object
*    properties:
*     tamaño:
*      type: string
*      example: grande
*     precio:
*      type: number
*      example: 200
*     ingredientes:
*      type: array
*      items:  
*       type: object
*       $ref: '#/components/schemas/relacionIngrediente'  
*/