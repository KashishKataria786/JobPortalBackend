import express from 'express'
import { DELETEUserDataController, GETUserProfileController, POSTUserVerificationController } from '../controlletrs/UserControllers.js';
import { commonUserAuthenticate } from '../middlewares/AuthenticateMiddleware.js';
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
/**
 * @swagger
 * /api/user/verify-email:
 *   post:
 *     summary: Verify the user's email address
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Email successfully verified
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

UserRoutes.post('/verify-email',commonUserAuthenticate, POSTUserVerificationController);
/**
 * @swagger
 * /delete-account:
 *   delete:
 *     summary: Delete the logged-in user's account and associated data
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User account and data deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User account and associated data deleted successfully
 *                 data:
 *                   type: object
 *                   description: Deleted user data
 *       404:
 *         description: User not found or already deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User account not found or already deleted
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 *                 error:
 *                   type: string
 *                   example: Some error message
 */
UserRoutes.delete('/delete-account',commonUserAuthenticate, DELETEUserDataController);
export default UserRoutes   