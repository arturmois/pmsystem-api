import { Router } from 'express';
import BudgetController from '../controllers/BudgetController';
import { CreateBudgetSchema, UpdateBudgetSchema } from '../models/schemas/budgetSchemas';
import ValidationMiddleware from '../shared/middlewares/ValidationMiddleware';

const userRouter = Router();
const budgetController = new BudgetController();

userRouter.post('/', ValidationMiddleware.execute(CreateBudgetSchema), budgetController.controllertCreateBudge);
userRouter.get('/:id', budgetController.controllertGetAllBudgets);
userRouter.put('/:id', ValidationMiddleware.execute(UpdateBudgetSchema), budgetController.controllerUpdateBudget);
userRouter.delete('/:id', budgetController.controllerDeleteBudget);
// userRouter.get('/teste2', userController.teste2);

export default userRouter;