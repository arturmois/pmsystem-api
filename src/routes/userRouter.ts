import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/professional', userController.registerProfessional);
userRouter.post('/company', userController.registerCompany);

userRouter.post('/login', userController.login);

export default userRouter;