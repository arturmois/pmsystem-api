import { Router } from "express";
import SaleController from "../controllers/SaleController";

const saleRouter = Router();
const saleController = new SaleController();

saleRouter.post("/sale", saleController.controllerCreateSale);
saleRouter.post("/sale/budget", saleController.controllerCreateSaleBudget);
saleRouter.get("/sale/:id", saleController.controllerFindSaleBySaleId);
saleRouter.get("/sale", saleController.controllerFindAllSales);
saleRouter.put("/sale/:id", saleController.controllerUpdateSale);
saleRouter.delete("/sale/:id", saleController.controllerDeleteSale);

export default saleRouter;
