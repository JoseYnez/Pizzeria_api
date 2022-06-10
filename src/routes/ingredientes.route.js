import { Router } from "express";
import * as ingredientesController from "../controllers/ingredientes.controller"
import * as ingredientesSucursalController from "../controllers/ingredientesSucursal.controller"
import { verifyTokenEmpleado,EmpleadoIsAdmin,EmpleadoIsGerente} from "../middlewares/authjwt";

const router=Router();

router.get('/',ingredientesController.getIngredientes);
router.get('/bySucursal/:id',ingredientesController.getIngredientesBySucrsal);
router.get('/updatePorciones/:id',EmpleadoIsGerente,ingredientesSucursalController.updatePorcionesIngredienteBySucursal);
router.post('/createIngrediente',EmpleadoIsAdmin,ingredientesController.createIngrediente);
router.put('/updateIngrediente',EmpleadoIsAdmin,ingredientesController.updateIngredienteById);
router.delete('/dropIngrediente/:id',EmpleadoIsAdmin,ingredientesController.dropIngredienteById);

export default router;

/**
 * @swagger
 * tags:
 *  name: Ingredientes
 *  description: API para la gestion de ingredientes.
 */

/**
 * @swagger
 * paths:
 *  /api/ingredientes/: 
 *   get:
 *      summary: Muestra todos los ingredientes.
 *      tags: [Ingredientes]
 *      responses:
 *          200:
 *           description: todas los ingredientes
 *           content:
 *            application/json:
 *             schema:
 *              type: array
 *              items:
 *               type: object
 *               properties:
 *                nombre:
 *                 type: string
 *                 example: Queso motzarela
 *                 required: true
 *                porcion:
 *                 type: number
 *                 example: 30
 *                 required: true
 *                medida:
 *                 type: date
 *                 example: Gramos
 *                 required: true
 *                precio_porcion:
 *                 type: number
 *                 example: 10
 *                 required: true
 *                imgUrl:
 *                 type: string
 *                 example: www.img.jpg
 *                 required: true
 *                idProducto:
 *                 type: ObjectId
 *                 example: 628b24b51870e03f354f51a1
 *                 required: true
 */ 


/**
 * @swagger
 * paths:
 *  /api/ingredientes/bySucursal/{sucursalId}: 
 *   get:
 *      summary: Muestra todos los ingredientes y la cantidad que hay por sucursal.
 *      tags: [Ingredientes]
 *      parameters:
 *       - in: path 
 *         name: sucursalId
 *         type: string
 *         example: 628efef49f06f4dbaa90872f
 *         required: true
 *         description: ID de la sucursal.
 *      responses:
 *          200:
 *           description: todas los ingredientes
 *           content:
 *            application/json:
 *             schema:
 *              type: array
 *              items:
 *               type: object
 *               properties:
 *                nombre:
 *                 type: string
 *                 example: Queso motzarela
 *                 required: true
 *                porcion:
 *                 type: number
 *                 example: 30
 *                 required: true
 *                medida:
 *                 type: date
 *                 example: Gramos
 *                 required: true
 *                precio_porcion:
 *                 type: number
 *                 example: 10
 *                 required: true
 *                imgUrl:
 *                 type: string
 *                 example: www.img.jpg
 *                 required: true
 *                idProducto:
 *                 type: ObjectId
 *                 example: 628b24b51870e03f354f51a1
 *                 required: true
 */ 

/**
 * @swagger
 * paths:
 *  /api/ingredientes/updatePorciones/{sucursalId}: 
 *   get:
 *      summary: Actualiza todas las porciones de cada ingredeinete en esa sucursalW.
 *      tags: [Ingredientes]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: an authorization token
 *         required: true
 *         type: string
 *       - in: path 
 *         name: sucursalId
 *         type: string
 *         example: 628efef49f06f4dbaa90872f
 *         required: true
 *         description: ID de la sucursal.
 *      responses:
 *          200:
 *           description: se actualizaron las porciones
 */ 

/**
 * @swagger
 * paths:
 *  /api/ingredientes/createIngrediente: 
 *   post:
 *      summary: Actualiza un ingrediente.
 *      tags: [Ingredientes]
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
 *               example: Queso motzarela
 *               required: true
 *              porcion:
 *               type: number
 *               example: 30
 *               required: true
 *              medida:
 *               type: date
 *               example: Gramos
 *               required: true
 *              precio_porcion:
 *               type: number
 *               example: 10
 *               required: true
 *              imgUrl:
 *               type: string
 *               example: www.img.jpg
 *               required: true
 *              id_producto:
 *               type: ObjectId
 *               example: 628b24b51870e03f354f51a1
 *               required: true
 *      responses:
 *          201:
 *           description: se creo el ingrediente
 */ 

/**
 * @swagger
 * paths:
 *  /api/ingredientes/updateIngrediente: 
 *   put:
 *      summary: Muestra todos los ingredientes.
 *      tags: [Ingredientes]
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
 *              nombre:
 *               type: string
 *               example: Queso motzarela
 *               required: true
 *              porcion:
 *               type: number
 *               example: 30
 *               required: true
 *              medida:
 *               type: date
 *               example: Gramos
 *               required: true
 *              precio_porcion:
 *               type: number
 *               example: 10
 *               required: true
 *              imgUrl:
 *               type: string
 *               example: www.img.jpg
 *               required: true
 *              idProducto:
 *               type: ObjectId
 *               example: 628b24b51870e03f354f51a1
 *               required: true
 *      responses:
 *          200:
 *           description: todas los ingredientes
 *           content:
 *            application/json:
 *             schema:
 *             type: object
 *             properties:
 *              _id:
 *               type: string
 *               example: 628b24b51870e03f354f51a1
 *               required: true
 *              nombre:
 *               type: string
 *               example: Queso motzarela
 *               required: true
 *              porcion:
 *               type: number
 *               example: 30
 *               required: true
 *              medida:
 *               type: date
 *               example: Gramos
 *               required: true
 *              precio_porcion:
 *               type: number
 *               example: 10
 *               required: true
 *              imgUrl:
 *               type: string
 *               example: www.img.jpg
 *               required: true
 *              idProducto:
 *               type: ObjectId
 *               example: 628b24b51870e03f354f51a1
 *               required: true
 */ 

/**
 * @swagger
 * paths:
 *  /api/ingredientes/dropIngrediente/{ingredienteId}: 
 *   delete:
 *      summary: Elimina ingredientes por id.
 *      tags: [Ingredientes]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: an authorization token
 *         required: true
 *         type: string
 *       - in: path 
 *         name: ingredienteId
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
*    relacionIngrediente:
*     type: object
*     properties:
*       id_ingrediente:
*         type: ObjectId
*         example: 62a264bb37165f1be68ed829
*       porciones:
*         type: number
*         example: 3
*          
*/