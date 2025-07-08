import express from 'express'
import { GETUserProfileController } from '../controlletrs/UserControllers.js';
const UserRoutes = express.Router();

UserRoutes.get('/profile-data/:id', GETUserProfileController);

export default UserRoutes   