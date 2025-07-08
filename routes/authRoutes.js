import express from "express";
import { POSTLoginUserController, POSTRegisterUserController } from "../controlletrs/AuthControllers.js";

const AuthRouter = express.Router();

AuthRouter.post('/register-user',POSTRegisterUserController);
AuthRouter.post('/login-user', POSTLoginUserController);    



export default AuthRouter