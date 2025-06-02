import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';

const projectRouter = Router();
const projectController = new ProjectController();

projectRouter.post('/project', projectController.controllerCreateProject);

export default projectRouter;