import { Request, Response } from "express";
import { inject } from "../shared/di/DI";

import {
  createTicketSchema,
  updateTicketSchema,
} from "../models/schemas/ticketSchema";
import TicketService from "../services/ticket/TicketService";

export default class TicketController {
  @inject("ticketService")
  private ticketService!: TicketService;

  async create(req: Request, res: Response) {
    try {
      const validatedData = createTicketSchema.parse(req.body);
      const ticket = await this.ticketService.createTicket(validatedData);
      res.status(201).json(ticket);
    } catch (error: any) {
      res.status(400).json({ error: error.errors || error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const tickets = await this.ticketService.getAllTickets();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar tickets" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const ticket = await this.ticketService.getTicketById(req.params.id);
      if (!ticket)
        return res.status(404).json({ error: "Ticket não encontrado" });
      res.json(ticket);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar ticket" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const validatedData = updateTicketSchema.parse(req.body);
      const ticket = await this.ticketService.updateTicket(
        req.params.id,
        validatedData
      );
      res.json(ticket);
    } catch (error: any) {
      res.status(400).json({ error: error.errors || error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.ticketService.deleteTicket(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar ticket" });
    }
  }
}
