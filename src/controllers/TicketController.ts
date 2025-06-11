import { Request, Response } from "express";
import { inject } from "../shared/di/DI";
import TicketService from "../services/ticket/TicketService";

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
      res.status(400).json({ error: error.errors || error.message });
    }
  };

  async getAll(req: Request, res: Response) {
    try {
      const tickets = await this.ticketService.getAll();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar tickets" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const ticket = await this.ticketService.getById(id);
      if (!ticket)
        return res.status(404).json({ error: "Ticket não encontrado" });
      res.json(ticket);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar ticket" });
    }
  }

  async update(req: Request, res: Response) {
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

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.ticketService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar ticket" });
    }
  }
}
