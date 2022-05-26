import { Router } from "express";
import * as authController from "../controllers/authEmpleado.controller"

const router=Router();

router.post('/EmpleadoSingIn',authController.EmpleadoSingIn);
router.post('/EmpleadoSingUp',authController.EmpleadoSingUp);

export default router;

/**
 * @swagger
 * tags:
 *  name: Empleado
 *  description: API para interactuar con los empleados
 */

/**
 * @swagger
 * paths:
 *  /api/authEmpleado/EmpleadoSingIn: 
 *   post:
 *      summary: retorna un token si los datos son validos.
 *      tags: [AuthEmpleado]
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *            schema:
 *             type: object 
 *             properties:
 *              correo:
 *               type: string
 *               description: correo a verificar
 *               required: true
 *               example: ejemplo@ejemplo.com
 *              passwd:
 *               type: string
 *               description: clave a verificar
 *               required: true
 *               example: clave
 *      responses:
 *          201:
 *           description: nuevo token de empleado
 *           content:
 *            application/json:
 *             schema:
 *              type: object
 *              properties:
 *              token:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhmYjYyNTkzMzJkODdjZDkzZWIxNTQiLCJjb3JyZW8iOiJlamVtcGxvQGVqZW1wbG8zMy5jb20iLCJ0aXBvIjoiZ2VuZXJhbCIsImlhdCI6MTY1MzU4NTcxNn0.sEGap-rfIcK0l1jzAKajmVuol1IJUi34vdpc06Q7wOs
 */

/**
 * @swagger
 * paths:
 *  /api/authEmpleado/EmpleadoSingUp: 
 *   post:
 *      summary: retorna un token si el empleado se registra corrctamewnte.
 *      tags: [AuthEmpleado]
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *            schema:
 *             type: object 
 *             $ref: '#/components/schemas/Empleado'   
 *      responses:
 *          201:
 *           description: nuevo token de empleado
 *           content:
 *            application/json:
 *             schema:
 *              type: object
 *              properties:
 *              token:
 *               type: string
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhmYjYyNTkzMzJkODdjZDkzZWIxNTQiLCJjb3JyZW8iOiJlamVtcGxvQGVqZW1wbG8zMy5jb20iLCJ0aXBvIjoiZ2VuZXJhbCIsImlhdCI6MTY1MzU4NTcxNn0.sEGap-rfIcK0l1jzAKajmVuol1IJUi34vdpc06Q7wOs"
 */

