import { Router } from 'express';
import BudgetController from '../controllers/BudgetController';

const userRouter = Router();
const budgetController = new BudgetController();

userRouter.post('/budget-create', budgetController.controllertCreateBudge);
userRouter.get('/:id', budgetController.controllertGetAllBudgets);
userRouter.put('/budget-update/:id', budgetController.controllerUpdateBudget);
userRouter.delete('/budget-delete/:id', budgetController.controllerDeleteBudget);
// userRouter.get('/teste2', userController.teste2);

export default userRouter;