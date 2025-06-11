import { NextFunction, Request, Response } from 'express';
import BudgetService from "../services/budget/BudgetService"
import { inject } from '../shared/di/DI';

export default class BudgetController {
	@inject('budgetService')
	private budgetService !: BudgetService;

	create = async (req: any, res: Response, next: NextFunction) => {
		try {
			const input = req.body;
			input.userId = req.userId;
			const result = await this.budgetService.create(input)
			res.status(201).json(result);
		}
		catch (error) {
			next(error);
		}
	}

	getAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const result = await this.budgetService.getAll(id);
			res.json(result);
		} catch (error) {
			next(error);
		}
	}

	update = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const input = req.body;
			const response = await this.budgetService.update(id, input);
			res.json(response);
		} catch (error) {
			next(error);
		}
	}

	delete = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			await this.budgetService.delete(id);
			res.json({ message: "Budget deleted successfully" });
		} catch (error) {
			next(error);
		}
	}
}
