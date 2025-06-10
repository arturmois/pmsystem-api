import { Router } from "express";
import TicketController from "../controllers/TicketController";
import ValidationMiddleware from "../shared/middlewares/ValidationMiddleware";
import { CreateTicketSchema, UpdateTicketSchema } from "../models/schemas/ticketSchema";

const router = Router();

const ticketController = new TicketController();

router.post("/", ValidationMiddleware.execute(CreateTicketSchema), ticketController.create);
router.get("/", ticketController.getAll);
router.put("/:id", ValidationMiddleware.execute(UpdateTicketSchema), ticketController.update);
router.delete("/:id", ticketController.delete);

export default router;
