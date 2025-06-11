import { Router } from "express";
import SaleController from "../controllers/SaleController";
import { CreateSaleSchema, UpdateSaleSchema } from "../models/schemas/saleSchema";
import ValidationMiddleware from "../shared/middlewares/ValidationMiddleware";

const saleRouter = Router();
const saleController = new SaleController();

saleRouter.post("/", ValidationMiddleware.execute(CreateSaleSchema), saleController.controllerCreateSale);
saleRouter.post("/budget", saleController.controllerCreateSaleBudget);
saleRouter.get("/:id", saleController.controllerFindSaleBySaleId);
saleRouter.get("/", saleController.controllerFindAllSales);
saleRouter.put("/:id", ValidationMiddleware.execute(UpdateSaleSchema), saleController.controllerUpdateSale);
saleRouter.delete("/:id", saleController.controllerDeleteSale);

export default saleRouter;
