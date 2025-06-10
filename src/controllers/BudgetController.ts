import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import BudgetService from "../services/budget/BudgetService"
import { inject } from '../shared/di/DI';

class BudgetController {
	@inject('budgetService')
	private budgetService !: BudgetService;

	controllertCreateBudge = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const input = req.body;
			const response = await this.budgetService.serviceCreateBudget(input)
			res.json({ message: "Success", data: response.data, status: 201 });
		}
		catch (error) {
			if (error instanceof z.ZodError) {
				res.status(400).json({ error: error.errors });
			} else {
				next(error);
			}
		}
	}

	controllertGetAllBudgets = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const result = await this.budgetService.serviceAllBudgets(id);

			res.json({ message: "Success", data: result, status: 200 });
		} catch (error) {
			console.log(error);
		}
	}

	controllerUpdateBudget = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const input = req.body;
			const response = await this.budgetService.serviceUpdateBudget(id, input);
			res.json({ message: "Budget updated successfully", data: response, status: 200 });
		} catch (error) {
			if (error instanceof z.ZodError) {
				res.status(400).json({ error: error.errors });
			} else {
				next(error);
			}
		}
	}

	controllerDeleteBudget = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			await this.budgetService.serviceDeleteBudget(id);
			res.json({ message: "Budget deleted successfully", status: 200 });
		} catch (error) {
			next(error);
		}
	}
}

export default BudgetController;