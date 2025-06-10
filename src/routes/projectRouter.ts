import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';
import ValidationMiddleware from '../shared/middlewares/ValidationMiddleware';
import { CreateProjectSchema, UpdateProjectSchema } from '../models/schemas/projectSchemas';

const router = Router();
const projectController = new ProjectController();

router.post('/', ValidationMiddleware.execute(CreateProjectSchema), projectController.create);
router.get('/', projectController.getAll);
router.put('/:id', ValidationMiddleware.execute(UpdateProjectSchema), projectController.update);
router.delete('/', projectController.delete);

export default router;