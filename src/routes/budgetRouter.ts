import { Router } from 'express';
import BudgetController from '../controllers/BudgetController';
import { CreateBudgetSchema, UpdateBudgetSchema } from '../models/schemas/budgetSchemas';
import ValidationMiddleware from '../shared/middlewares/ValidationMiddleware';

const budgetRouter = Router();
const budgetController = new BudgetController();

budgetRouter.post('/', ValidationMiddleware.execute(CreateBudgetSchema), budgetController.create);
budgetRouter.get('/', budgetController.getAll);
budgetRouter.put('/:id', ValidationMiddleware.execute(UpdateBudgetSchema), budgetController.update);
budgetRouter.delete('/:id', budgetController.delete);

export default budgetRouter;