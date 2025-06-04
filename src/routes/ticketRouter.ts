import { Router } from "express";
import TicketController from "../controllers/TicketController";

const router = Router();

const ticketController = new TicketController();

router.post("/create-ticket", ticketController.create);
router.get("/ticket", ticketController.getAll);
// router.get("/ticket/:id", ticketController.getById);
router.put("/ticket/:id", ticketController.update);
router.delete("/ticket/:id", ticketController.delete);

export default router;
