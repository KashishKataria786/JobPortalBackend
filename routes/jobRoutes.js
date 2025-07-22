import express from 'express'
import {  DELETEparticularJobController, DELETESelectedJobController, GETAllJobController, GETAparticularJobController, GETJobByRecruitorIdControllers, GETSearchJobByKeywordController, PATCHApplyJobController, PATCHJobActiveStatusChangeController, PATCHSaveJobController, POSTNewJobController, UPDATEJobController } from '../controlletrs/JobControllers.js';
import { authorizationChecker, jobSeekerAuthenticate, recruiterAuthenticate } from '../middlewares/AuthenticateMiddleware.js';
import { JobModel } from '../models/JobModel.js';

const JobRouter = express.Router();

/**
 * @swagger
 * /api/v1/jobs/add-new-job:
 *   post:
 *     summary: Add a New job 
 *     description: Add a new job as a recruitor
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: A list of jobs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '../models/JobModel.js'
 */
JobRouter.post('/add-new-job',recruiterAuthenticate,POSTNewJobController);
/**
 * @swagger
 * /api/v1/jobs/get-all-jobs:
 *   get:
 *     summary: Get all jobs
 *     description: Retrieve a list of all jobs posted by recruiters.
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: A list of jobs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '../models/JobModel.js'
 */
JobRouter.get('/get-all-jobs',GETAllJobController);
/**
 * @swagger
 * /api/v1/jobs/delete-job/{id}:
 *   delete:
 *     summary: Delete a specific job by ID
 *     tags: [Jobs]
 *     description: Recruiters can delete their own posted job using its ID. Requires authentication and authorization.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB Job ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deleted successfully
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
 *                   $ref: '#/components/schemas/Job'
 *       400:
 *         description: Job ID not provided
 *       404:
 *         description: Job not found or already deleted
 *       500:
 *         description: Internal server error
 */
JobRouter.delete('/delete-job/:id',recruiterAuthenticate,authorizationChecker(JobModel,'postedBy'),DELETEparticularJobController);
/**
 * @swagger
 * /api/v1/jobs/update-job/{id}:
 *   patch:
 *     summary: Update a job by ID
 *     tags: [Jobs]
 *     description: Recruiters can update the job they posted by providing the job ID and updated fields.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB Job ID to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Fields to update
 *             properties:
 *               job_position:
 *                 type: string
 *               company:
 *                 type: string
 *               location:
 *                 type: string
 *               jobType:
 *                 type: string
 *               workMode:
 *                 type: string
 *               description:
 *                 type: string
 *               requirements:
 *                 type: string
 *               salary:
 *                 type: string
 *               experienceLevel:
 *                 type: string
 *               education:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Job updated successfully
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
 *                   $ref: '#/components/schemas/Job'
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
JobRouter.patch('/update-job/:id',recruiterAuthenticate,authorizationChecker(JobModel,'postedBy'),UPDATEJobController);
/**
 * @swagger
 * /api/v1/jobs/get-job/{id}:
 *   get:
 *     summary: Get a particular job by ID
 *     tags: [Jobs]
 *     description: Retrieve the full details of a job post using its MongoDB ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB Job ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job retrieved successfully
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
 *                   $ref: '#/components/schemas/Job'
 *       404:
 *         description: Job not found
 *       500:
 *         description: Unable to get job
 */
JobRouter.get('/get-job/:id', GETAparticularJobController);
/**
 * @swagger
 * /api/v1/jobs/change-job-status/{id}:
 *   patch:
 *     summary: Change job active status
 *     tags: [Jobs]
 *     description: Allows recruiters to toggle the active/inactive status of their posted job
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Job ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [isActive]
 *             properties:
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Job status updated
 *       400:
 *         description: Invalid status type
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
JobRouter.patch('/change-job-status/:id',recruiterAuthenticate,authorizationChecker(JobModel,'postedBy'), PATCHJobActiveStatusChangeController);
/**
 * @swagger
 * /api/v1/jobs/search:
 *   get:
 *     summary: Search jobs by keyword
 *     tags: [Jobs]
 *     description: Searches jobs based on keyword across job title, company, location, and skills
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search keyword
 *     responses:
 *       200:
 *         description: Jobs fetched
 *       500:
 *         description: Search failed
 */
JobRouter.get('/search',GETSearchJobByKeywordController);
/**
 * @swagger
 * /api/v1/jobs/batch-delete-jobs:
 *   delete:
 *     summary: Batch delete jobs
 *     tags: [Jobs]
 *     description: Deletes multiple jobs by their IDs (recruiter only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [jobIds]
 *             properties:
 *               jobIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["60f0cbb4f8263b001ef5d1c1", "60f0cbb4f8263b001ef5d1c2"]
 *     responses:
 *       200:
 *         description: Jobs deleted successfully
 *       400:
 *         description: Invalid format or deletion failed
 *       500:
 *         description: Internal server error
 */
JobRouter.delete('/batch-delete-jobs',recruiterAuthenticate,authorizationChecker(JobModel,'postedBy'),DELETESelectedJobController);
/**
 * @swagger
 * /api/v1/jobs/save-job/{id}:
 *   patch:
 *     summary: Save a job to user profile
 *     tags: [Jobs]
 *     description: Allows a jobseeker to save a job post to their saved jobs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Job ID to save
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job saved
 *       400:
 *         description: Job already saved
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
JobRouter.patch('/save-job/:id',jobSeekerAuthenticate,PATCHSaveJobController);
/**
 * @swagger
 * /api/v1/jobs/uploaded-jobs:
 *   get:
 *     summary: Get jobs uploaded by recruiter
 *     tags: [Jobs]
 *     description: Retrieves all jobs posted by the authenticated recruiter
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Jobs retrieved successfully
 *       404:
 *         description: No jobs found
 *       500:
 *         description: Server error
 */
JobRouter.get('/uploaded-jobs',recruiterAuthenticate,GETJobByRecruitorIdControllers);

JobRouter.patch('/apply-job/:id',PATCHApplyJobController);
export default JobRouter;