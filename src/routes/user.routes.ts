import { Router, RequestHandler } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/UserRepository';

const router: Router = Router();
const userRepository = new UserRepository();
const userController = new UserController(new UserService(userRepository));

router.post('/login', userController.login as RequestHandler);
router.post('/register-professional', userController.registerProfessional as RequestHandler);
router.post('/register-company', userController.registerCompany as RequestHandler);
router.get('/user', userController.getUser as RequestHandler);

export { router as userRoutes }; 