import { inject } from "../shared/di/DI";
import SaleService from "../services/sale/SaleService";
import { NextFunction, Request, Response } from "express";
import z from "zod";

export default class SaleController {
  @inject("saleService")
  private saleService!: SaleService;

  controllerCreateSale = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = req.body;
      const response = await this.saleService.serviceCreateSale(input);
      res.json({ message: "Success", data: response.data, status: 201 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        next(error);
      }
    }
  };

  controllerCreateSaleBudget = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const input = req.body;
      const response = await this.saleService.serviceCreateSaleBudget(input);
      res.json({ message: "Success", data: response.data, status: 201 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        next(error);
      }
    }
  };

  controllerFindSaleBySaleId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const response = await this.saleService.serviceFindSaleBySaleId(id);
      res.json({ message: "Success", data: response.data, status: 200 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        next(error);
      }
    }
  };

  controllerFindAllSales = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const response = await this.saleService.serviceFindAllSales();
      res.json({ message: "Success", data: response.data, status: 200 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        next(error);
      }
    }
  };

  controllerUpdateSale = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const input = req.body;
      const response = await this.saleService.serviceUpdateSale(input);
      res.json({ message: "Success", data: response.data, status: 200 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        next(error);
      }
    }
  };

  controllerDeleteSale = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const input = req.body;
      await this.saleService.serviceDeleteSale(input);
      res.json({ message: "Success", status: 200 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        next(error);
      }
    }
  };
}
