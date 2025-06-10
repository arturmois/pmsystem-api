import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';
import ValidationMiddleware from '../shared/middlewares/ValidationMiddleware';
import { CreateProjectSchema, UpdateProjectSchema } from '../models/schemas/projectSchemas';

const router = Router();
const projectController = new ProjectController();

router.post('/', ValidationMiddleware.execute(CreateProjectSchema), projectController.controllerCreateProject);
router.get('/:id', projectController.controllerGetAllProjects);
router.put('/:id', ValidationMiddleware.execute(UpdateProjectSchema), projectController.controllerUpdateProject);
router.delete('/', projectController.controllerDeleteProject);

export default router;