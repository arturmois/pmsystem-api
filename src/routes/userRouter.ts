import { Router } from 'express';
import { Registry } from '../shared/di/DI';

const router: Router = Router();
const userController = Registry.getInstance().inject('userController');

if (!userController) {
  throw new Error('UserController not found in registry');
}

router.post('/register-professional', (req, res) => {
  if (!userController.registerProfessional) {
    throw new Error('registerProfessional method not found on UserController');
  }
  return userController.registerProfessional(req, res);
});

router.post('/register-company', (req, res) => {
  if (!userController.registerCompany) {
    throw new Error('registerCompany method not found on UserController');
  }
  return userController.registerCompany(req, res);
});

router.post('/login', (req, res) => {
  if (!userController.login) {
    throw new Error('login method not found on UserController');
  }
  return userController.login(req, res);
});

export default router;