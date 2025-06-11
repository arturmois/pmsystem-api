import { Router } from 'express';
import UserController from '../controllers/UserController';
import ValidationMiddleware from '../shared/middlewares/ValidationMiddleware';
import { CreateCompanySchema, CreateProfessionalSchema } from '../models/schemas/userSchemas';
import AuthMiddleware from '../shared/middlewares/AuthMiddleware';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/professional', ValidationMiddleware.execute(CreateProfessionalSchema), userController.registerProfessional);
userRouter.post('/company', ValidationMiddleware.execute(CreateCompanySchema), userController.registerCompany);
userRouter.get('/', AuthMiddleware.execute, userController.getUsers);
userRouter.post('/login', userController.login);

export default userRouter;