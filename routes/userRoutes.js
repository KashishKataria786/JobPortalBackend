import express from 'express'
import { DELETEUserDataController, GETUserProfileController, POSTUserVerificationController, GETUserSavedJobController, PATCHRemoveUserSavedJobController } from '../controlletrs/UserControllers.js';
import { commonUserAuthenticate, jobSeekerAuthenticate } from '../middlewares/AuthenticateMiddleware.js';
const UserRoutes = express.Router();

/**
 * @swagger
 * /api/v1/user/profile-data/{id}:
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
 * /api/v1/user/verify-email:
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
 * /api/v1/user/delete-account:
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
/**
 * @swagger
 * /api/v1/user/saved-jobs:
 *   get:
 *     summary: Get all saved jobs for the authenticated user
 *     description: Returns a list of job IDs that the user has saved.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved saved jobs
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
 *                   example: Jobs retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "60f7e4a3d3d5ab001fc4a65e"
 *       404:
 *         description: No saved jobs found or user not found
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
 *                   example: No saved jobs found
 *       500:
 *         description: Internal Server Error
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
 */

UserRoutes.get('/saved-jobs',commonUserAuthenticate, GETUserSavedJobController);
/**
 * @swagger
 * /api/v1/user/remove-saved-job/{id}:
 *   patch:
 *     summary: Remove a saved job from user's saved list
 *     description: Authenticated users can remove a job from their saved jobs by providing the job ID.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the job to remove from saved jobs
 *         schema:
 *           type: string
 *           example: "64f26d09e2d9842c0d3cf64e"
 *     responses:
 *       200:
 *         description: Job removed successfully from saved list
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
 *                   example: Job removed successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "64f26d09e2d9842c0d3cf650"
 *       404:
 *         description: User or Job not found in saved jobs
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
 *                   example: Job not found in saved jobs
 *       500:
 *         description: Server error while removing job
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
 */

UserRoutes.patch('/remove-saved-job/:id',commonUserAuthenticate , PATCHRemoveUserSavedJobController );

export default UserRoutes   