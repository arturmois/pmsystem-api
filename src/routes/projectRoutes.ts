import { Router, RequestHandler } from 'express';
import ProjectController from '../controllers/ProjectController';

const router: Router = Router();
const projectController = new ProjectController();

router.post('/create-project', projectController.controllerCreateProject as RequestHandler);
router.get('/:id', projectController.controllerGetAllProjects as RequestHandler);
router.put('/update-project', projectController.controllerUpdateProject as RequestHandler);
router.delete('/delete-project/:id', projectController.controllerDeleteProject as RequestHandler);

export default router;