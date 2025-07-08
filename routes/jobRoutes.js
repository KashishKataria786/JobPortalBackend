import express from 'express'
import {  DELETEparticularJobController, GETAllJobController, GETAparticularJobController, GETSearchJobByKeywordController, PATCHJobActiveStatusChangeController, POSTNewJobController, UPDATEJobController } from '../controlletrs/JobControllers.js';
import { jobSeekerAuthenticate } from '../middlewares/AuthenticateMiddleware.js';

const JobRouter = express.Router();

JobRouter.post('/add-new-job',POSTNewJobController);
JobRouter.get('/get-all-jobs',jobSeekerAuthenticate,GETAllJobController);
JobRouter.delete('/delete-job/:id',DELETEparticularJobController);
JobRouter.patch('/update-job/:id', UPDATEJobController);
JobRouter.get('/get-job/:id', GETAparticularJobController);
JobRouter.patch('/change-job-status/:id', PATCHJobActiveStatusChangeController);
JobRouter.get('/search',GETSearchJobByKeywordController);

export default JobRouter;