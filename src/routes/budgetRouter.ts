import { Router } from 'express';
import BudgetController from '../controllers/BudgetController';
import { CreateBudgetSchema, UpdateBudgetSchema } from '../models/schemas/budgetSchemas';
import ValidationMiddleware from '../shared/middlewares/ValidationMiddleware';

const userRouter = Router();
const budgetController = new BudgetController();

userRouter.post('/', ValidationMiddleware.execute(CreateBudgetSchema), budgetController.create);
userRouter.get('/', budgetController.getAll);
userRouter.put('/:id', ValidationMiddleware.execute(UpdateBudgetSchema), budgetController.update);
userRouter.delete('/:id', budgetController.delete);

export default userRouter;