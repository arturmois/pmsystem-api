import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';

const router = Router();
const projectController = new ProjectController();

router.post('/create-project', projectController.controllerCreateProject);
router.get('/:id', projectController.controllerGetAllProjects);
router.put('/update-project', projectController.controllerUpdateProject);
router.delete('/delete-project', projectController.controllerDeleteProject);

export default router;