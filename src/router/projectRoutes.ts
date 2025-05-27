import { Router, RequestHandler } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { ProjectService } from '../services/project.service';
import { ProjectRepository } from '../repositories/projectRepository';

const router: Router = Router();
const projectRepository = new ProjectRepository();
const projectService = new ProjectService(projectRepository);
const projectController = new ProjectController(projectService);

router.post('/create-project', projectController.controllerCreateProject as RequestHandler);
router.get('/:id', projectController.controllerGetAllProjects as RequestHandler);
router.put('/update-project', projectController.controllerUpdateProject as RequestHandler);
router.delete('/delete-project/:id', projectController.controllerDeleteProject as RequestHandler);

export default router;