import { Router } from "express";
import * as productoController from "../controllers/productos.controller"
import { verifyToken } from "../middlewares/authjwt";
const router=Router();

router.get('/',productoController.getProductos);
router.get('/cliente',productoController.getProductosNoI);
router.get('/cliente/:id',productoController.getProductoNoI);
router.get('/:id',verifyToken,productoController.getProducto);
router.get('/bySucursal/:id',productoController.getProductosBySucursalNoI);
router.post('/createProducto',productoController.createProducto);
router.post('/findByAtributes',productoController.getProductoQuery);
router.put('/updateProducto',verifyToken,productoController.updateProductoById);
router.delete('/dropProducto/:id',verifyToken,productoController.dropProductoById);


export default router;

/**
 * @swagger
 * tags:
 *  name: Productos
 *  description: API para la gestion de productos.
 */

/**
 * @swagger
 * paths:
 *  /api/productos/: 
 *   get:
 *      summary: Muestra todos los productos solo cuando un empleado con rango de gerente o superior lo solicita.
 *      tags: [Productos]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: an authorization token
 *         required: true
 *         type: string
 *      responses:
 *          200:
 *           description: todas los productos
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
 *                 example: Queso motzarela
 *                 required: true
 *                marca:
 *                 type: string
 *                 example: Caperucita
 *                 required: true
 *                contenido:
 *                 type: number
 *                 example: 10
 *                 required: true
 *                medida:
 *                 type: date
 *                 example: kilogramo
 *                 required: true
 *                imgUrl:
 *                 type: string
 *                 example: www.img.jpg
 *                 required: true
 *                tipo:
 *                 type: string
 *                 example: ingrediente
 *                 required: true
 */ 

/**
 * @swagger
 * paths:
 *  /api/productos/{productoId}: 
 *   get:
 *      summary: Muestra todos los productos solo cuando un empleado con rango de gerente o superior lo solicita.
 *      tags: [Productos]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: an authorization token
 *         required: true
 *         type: string
 *       - in: path 
 *         name: productoId
 *         type: string
 *         example: 628efef49f06f4dbaa90872f
 *         required: true
 *         description: ID del producto a obtener.
 *      responses:
 *          200:
 *           description: producto buscado
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
 *                example: Queso motzarela
 *                required: true
 *               marca:
 *                type: string
 *                example: Caperucita
 *                required: true
 *               contenido:
 *                type: number
 *                example: 10
 *                required: true
 *               medida:
 *                type: date
 *                example: kilogramo
 *                required: true
 *               imgUrl:
 *                type: string
 *                example: www.img.jpg
 *                required: true
 *               tipo:
 *                type: string
 *                example: ingrediente
 *                required: true
 */ 

/**
 * @swagger
 * paths:
 *  /api/productos/cliente: 
 *   get:
 *      summary: Muestra todos los productos que no sean ingredientes.
 *      tags: [Productos]
 *      responses:
 *          200:
 *           description: todas los productos
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
 *                 example: Queso motzarela
 *                 required: true
 *                marca:
 *                 type: string
 *                 example: Caperucita
 *                 required: true
 *                contenido:
 *                 type: number
 *                 example: 10
 *                 required: true
 *                medida:
 *                 type: date
 *                 example: kilogramo
 *                 required: true
 *                imgUrl:
 *                 type: string
 *                 example: www.img.jpg
 *                 required: true
 *                tipo:
 *                 type: string
 *                 example: ingrediente
 *                 required: true
 */ 

/**
 * @swagger
 * paths:
 *  /api/productos/bySucursal/{idsucursal}: 
 *   get:
 *      summary: Muestra un producto solo cuando no es de tipo ingrediente.
 *      tags: [Productos]
 *      parameters:
 *       - in: path 
 *         name: idsucursal
 *         type: string
 *         example: 628efef49f06f4dbaa90872f
 *         required: true
 *         description: ID de la sucursal a obtener todos los productos.
 *      responses:
 *          200:
 *           description: productos buscados
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
 *                example: Queso motzarela
 *                required: true
 *               marca:
 *                type: string
 *                example: Caperucita
 *                required: true
 *               contenido:
 *                type: number
 *                example: 10
 *                required: true
 *               medida:
 *                type: date
 *                example: kilogramo
 *                required: true
 *               imgUrl:
 *                type: string
 *                example: www.img.jpg
 *                required: true
 *               tipo:
 *                type: string
 *                example: ingrediente
 *                required: true
 *               cantidad:
 *                type: number
 *                example: 10
 *                required: true
 */ 

/**
 * @swagger
 * paths:
 *  /api/productos/cliente/{productoId}: 
 *   get:
 *      summary: Muestra un producto solo cuando no es de tipo ingrediente.
 *      tags: [Productos]
 *      parameters:
 *       - in: path 
 *         name: productoId
 *         type: string
 *         example: 628efef49f06f4dbaa90872f
 *         required: true
 *         description: ID del producto a obtener.
 *      responses:
 *          200:
 *           description: producto buscado
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
 *                example: Queso motzarela
 *                required: true
 *               marca:
 *                type: string
 *                example: Caperucita
 *                required: true
 *               contenido:
 *                type: number
 *                example: 10
 *                required: true
 *               medida:
 *                type: date
 *                example: kilogramo
 *                required: true
 *               imgUrl:
 *                type: string
 *                example: www.img.jpg
 *                required: true
 *               tipo:
 *                type: string
 *                example: ingrediente
 *                required: true
 */ 

/**
 * @swagger
 * paths:
 *  /api/productos/createProducto: 
 *   post:
 *      summary: crea un producto solo cuando un admin lo hace.
 *      tags: [Productos]
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
 *              marca:
 *               type: string
 *               example: Caperucita
 *               required: true
 *              contenido:
 *               type: number
 *               example: 10
 *               required: true
 *              medida:
 *               type: date
 *               example: kilogramo
 *               required: true
 *              imgUrl:
 *               type: string
 *               example: www.img.jpg
 *               required: true
 *              tipo:
 *               type: string
 *               example: ingrediente
 *               required: true
 *      responses:
 *          200:
 *           description: producto creado
 */ 

/**
 * @swagger
 * paths:
 *  /api/productos/findByAtributes: 
 *   post:
 *      summary: Muestra todos los productos segun los atributos dados cuando un empleado con rango de gerente o superior lo solicita.
 *      tags: [Productos]
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
 *              ids_productos:
 *               type: array
 *               items:
 *                type: string
 *                example: 628b24b51870e03f354f51a1
 *              ids_sucursales:
 *               type: array
 *               items:
 *                type: string
 *                example: 628b24b51870e03f354f51a1
 *      responses:
 *          200:
 *           description: todas los productos
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
 *                 example: Queso motzarela
 *                 required: true
 *                marca:
 *                 type: string
 *                 example: Caperucita
 *                 required: true
 *                contenido:
 *                 type: number
 *                 example: 10
 *                 required: true
 *                medida:
 *                 type: date
 *                 example: kilogramo
 *                 required: true
 *                imgUrl:
 *                 type: string
 *                 example: www.img.jpg
 *                 required: true
 *                tipo:
 *                 type: string
 *                 example: ingrediente
 *                 required: true
 *                cantidad:
 *                 type: number
 *                 example: 10
 *                 required: true
 *                nombre_sucursal:
 *                 type: string
 *                 example: Sucursal norte
 *                 required: true
 *                id_sucursal:
 *                 type: objectId
 *                 example: 628e6181f2dff81358711d7e
 *                 required: true
 */ 

/**
 * @swagger
 * paths:
 *  /api/productos/updateProducto: 
 *   put:
 *      summary: actualiza un producto solo cuando un admin lo hace.
 *      tags: [Productos]
 *      parameters:
 *       - in: path 
 *         name: productoId
 *         type: string
 *         example: 628efef49f06f4dbaa90872f
 *         required: true
 *         description: ID del producto a obtener.
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
 *              marca:
 *               type: string
 *               example: Caperucita
 *               required: true
 *              contenido:
 *               type: number
 *               example: 10
 *               required: true
 *              medida:
 *               type: date
 *               example: kilogramo
 *               required: true
 *              imgUrl:
 *               type: string
 *               example: www.img.jpg
 *               required: true
 *              tipo:
 *               type: string
 *               example: ingrediente
 *               required: true
 *      responses:
 *          200:
 *           description: todas los productos
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
 *                 example: Queso motzarela
 *                 required: true
 *                marca:
 *                 type: string
 *                 example: Caperucita
 *                 required: true
 *                contenido:
 *                 type: number
 *                 example: 10
 *                 required: true
 *                medida:
 *                 type: date
 *                 example: kilogramo
 *                 required: true
 *                imgUrl:
 *                 type: string
 *                 example: www.img.jpg
 *                 required: true
 *                tipo:
 *                 type: string
 *                 example: ingrediente
 *                 required: true
 */ 

/**
 * @swagger
 * paths:
 *  /api/productos/dropProducto/{productoId}: 
 *   delete:
 *      summary: Muestra todos los productos solo cuando un empleado con rango de gerente o superior lo solicita.
 *      tags: [Productos]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: an authorization token
 *         required: true
 *         type: string
 *       - in: path 
 *         name: productoId
 *         type: string
 *         example: 628efef49f06f4dbaa90872f
 *         required: true
 *         description: ID del producto a obtener.
 *      responses:
 *          204:
 *           description: producto eliminado
 */ 