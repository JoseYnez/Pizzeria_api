import { Router } from "express";
import * as authController from "../controllers/authCliente.controller"

const router=Router();

router.post('/clienteSingIn',authController.clienteSingIn);
router.post('/clienteSingUp',authController.clienteSingUp);
router.post('/findCorreo',authController.findCorreo);

export default router;

/**
 * @swagger
 * tags:
 *  name: AuthCliente
 *  description: API para la autenticacion de los clientes
 */

/**
 * @swagger
 * paths:
 *  /api/authCliente/clienteSingIn: 
 *   post:
 *      summary: Permite el inicio de sesion de clientes.
 *      tags: [AuthCliente]
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
 *           description: nuevo token de cliente
 *           content:
 *            application/json:
 *             schema:
 *              type: object
 *              properties:
 *               token:
 *                type: string
 *                example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhmYjYyNTkzMzJkODdjZDkzZWIxNTQiLCJjb3JyZW8iOiJlamVtcGxvQGVqZW1wbG8zMy5jb20iLCJ0aXBvIjoiZ2VuZXJhbCIsImlhdCI6MTY1MzU4NTcxNn0.sEGap-rfIcK0l1jzAKajmVuol1IJUi34vdpc06Q7wOs
 */

/**
 * @swagger
 * paths:
 *  /api/authCliente/clienteSingUp: 
 *   post:
 *      summary: Permite el registro de clientes.
 *      tags: [AuthCliente]
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
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
 *               passwd:
 *                type: string
 *                example: clave
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
 *          201:
 *           description: nuevo token de cliente
 *           content:
 *            application/json:
 *             schema:
 *              type: object
 *              properties:
 *               token:
 *                type: string
 *                example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhmYjYyNTkzMzJkODdjZDkzZWIxNTQiLCJjb3JyZW8iOiJlamVtcGxvQGVqZW1wbG8zMy5jb20iLCJ0aXBvIjoiZ2VuZXJhbCIsImlhdCI6MTY1MzU4NTcxNn0.sEGap-rfIcK0l1jzAKajmVuol1IJUi34vdpc06Q7wOs
 *          404:
 *           description: token null, algo salio mal
 *           content:
 *            application/json:
 *             schema:
 *              type: object
 *              properties:
 *               token:
 *                type: string
 *                example: 
 
 */

/**
 * @swagger
 * paths:
 *  /api/authCliente/findCorreo: 
 *   post:
 *      summary: Verifica si el correo ya esta en uso.
 *      tags: [AuthCliente]
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *               correo:
 *                type: string
 *                example: ejemplo@ejemplo.com
 *                required: true
 *      responses:
 *          200:
 *           description: nuevo token de cliente
 *           content:
 *            application/json:
 *             schema:
 *              type: object
 *              properties:
 *               existe:
 *                type: boolean
 *                example: true
 */