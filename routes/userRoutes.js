import express from 'express'
import { GETUserProfileController } from '../controlletrs/UserControllers.js';
const UserRoutes = express.Router();

/**
 * @swagger
 * /api/user/profile-data/{id}:
 *   get:
 *     summary: Get user profile by ID
 *     tags: [User]
 *     description: Retrieves user data using the user ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB user ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

UserRoutes.get('/profile-data/:id', GETUserProfileController);

export default UserRoutes   