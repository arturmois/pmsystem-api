import { Request, Response } from "express";
import { inject } from "../shared/di/DI";
import TicketService from "../services/ticket/TicketService";
import AppError from "../shared/errors/AppError";

export default class TicketController {
  @inject("ticketService")
  private ticketService!: TicketService;

  create = async (req: any, res: Response) => {
    try {
      const input = req.body;
      input.userId = req.userId;
      const result = await this.ticketService.create(input);
      res.status(201).json(result);
    } catch (error: any) {
      throw new AppError(error.errors || error.message, 400);
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const budgetId = req.query.budgetId as string;
      const tickets = await this.ticketService.getAll(budgetId);
      res.json(tickets);
    } catch (error) {
      throw new AppError("Error searching tickets", 500);
    }
  }

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const ticket = await this.ticketService.getById(id);
      if (!ticket)
        return res.status(404).json({ error: "Ticket not found" });
      res.json(ticket);
    } catch (error) {
      throw new AppError("Error searching ticket", 500);
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const input = req.body;
      const ticket = await this.ticketService.update(
        req.params.id,
        input
      );
      res.json(ticket);
    } catch (error: any) {
      res.status(400).json({ error: error.errors || error.message });
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.ticketService.delete(id);
      res.status(204).send();
    } catch (error) {
      throw new AppError("Error deleting ticket", 500);
    }
  }

  upload = async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const { fileName, fileType } = req.body;
      const presignedUrl = await this.ticketService.upload(id, fileName, fileType);
      res.json(presignedUrl);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }

}
