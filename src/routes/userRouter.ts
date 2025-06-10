import { Router } from 'express';
import UserController from '../controllers/UserController';
import { validateData } from '../shared/middlewares/validationMiddleware';
import { companySchema, professionalSchema } from '../models/schemas/userSchemas';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/professional', validateData(professionalSchema), userController.registerProfessional);
userRouter.post('/company', validateData(companySchema), userController.registerCompany);

userRouter.post('/login', userController.login);

export default userRouter;