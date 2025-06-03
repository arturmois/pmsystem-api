import { Router } from "express";
import { Registry } from "../shared/di/DI";

const router = Router();

const ticketController = Registry.getInstance().inject("ticketController");

router.post("/", (req, res) => ticketController.create(req, res));
router.get("/", (req, res) => ticketController.getAll(req, res));
router.get("/:id", (req, res) => ticketController.getById(req, res));
router.put("/:id", (req, res) => ticketController.update(req, res));
router.delete("/:id", (req, res) => ticketController.delete(req, res));

export default router;
