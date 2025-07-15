import express from "express";
import { POSTLoginUserController, POSTRegisterUserController } from "../controlletrs/AuthControllers.js";



const AuthRouter = express.Router();

/**
 * @swagger
 * /api/auth/register-user:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     description: Create a new user with name, email, password, phone, and role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               role:
 *                 type: string
 *                 example: jobseeker
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 newUser:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing credentials
 *       422:
 *         description: User already exists
 *       500:
 *         description: Server error
 */

AuthRouter.post('/register-user',POSTRegisterUserController);
/**
 * @swagger
 * /api/auth/login-user:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     description: Logs in a registered user and returns a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing email or password
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */

AuthRouter.post('/login-user', POSTLoginUserController);    



export default AuthRouter