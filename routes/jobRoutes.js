import express from 'express'
import {  DELETEparticularJobController, DELETESelectedJobController, GETAllJobController, GETAparticularJobController, GETSearchJobByKeywordController, PATCHApplyJobController, PATCHJobActiveStatusChangeController, PATCHSaveJobController, POSTNewJobController, UPDATEJobController } from '../controlletrs/JobControllers.js';
import { authorizationChecker, jobSeekerAuthenticate, recruiterAuthenticate } from '../middlewares/AuthenticateMiddleware.js';
import { JobModel } from '../models/JobModel.js';

const JobRouter = express.Router();

JobRouter.post('/add-new-job',recruiterAuthenticate,POSTNewJobController);
JobRouter.get('/get-all-jobs',GETAllJobController);
JobRouter.delete('/delete-job/:id',recruiterAuthenticate,authorizationChecker(JobModel,'postedBy'),DELETEparticularJobController);
JobRouter.patch('/update-job/:id',recruiterAuthenticate,authorizationChecker(JobModel,'postedBy'),UPDATEJobController);
JobRouter.get('/get-job/:id', GETAparticularJobController);
JobRouter.patch('/change-job-status/:id',recruiterAuthenticate,authorizationChecker(JobModel,'postedBy'), PATCHJobActiveStatusChangeController);
JobRouter.get('/search',GETSearchJobByKeywordController);
JobRouter.delete('/batch-delete-jobs',recruiterAuthenticate,authorizationChecker(JobModel,'postedBy'),DELETESelectedJobController);
JobRouter.patch('/apply-job/:id',PATCHApplyJobController);
JobRouter.patch('/save-job/:id',jobSeekerAuthenticate, PATCHSaveJobController);
export default JobRouter;