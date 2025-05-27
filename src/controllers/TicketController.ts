// src/controllers/ticket.controller.ts

import { NextFunction, Request, Response } from 'express'; 
import { inject } from '../shared/di/DI'; 
import { TicketService } from '../services/ticket/ticket.service'; 

export default class TicketController {
  @inject('ticketService') 
  private ticketService!: TicketService; 

 
  createTicketEntry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ticketId, budgetId, userId, message, fileUrl } = req.body;
      const newEntry = await this.ticketService.createTicketEntry({ ticketId, budgetId, userId, message, fileUrl });
      res.status(201).json(newEntry);
    } catch (error) {
     
      res.status(400).json({ message: (error as Error).message }); 
      
    }
  };


  getTicketEntryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const entry = await this.ticketService.getTicketEntryById(id);
      if (entry) {
        res.status(200).json(entry);
      } else {
        res.status(404).json({ message: 'Ticket entry not found' });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
  
    }
  };

  
  getAllTicketEntries = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entries = await this.ticketService.getAllTicketEntries();
      res.status(200).json(entries);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });

    }
  };

 
  getTicketEntriesByTicketId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ticketId } = req.params;
      const entries = await this.ticketService.getTicketEntriesByTicketId(ticketId);
      if (entries.length > 0) {
        res.status(200).json(entries);
      } else {
        res.status(404).json({ message: 'No ticket entries found for this main ticket ID' });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
     
    }
  };

  
  getTicketEntriesByBudgetId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { budgetId } = req.params;
      const entries = await this.ticketService.getTicketEntriesByBudgetId(budgetId);
      if (entries.length > 0) {
        res.status(200).json(entries);
      } else {
        res.status(404).json({ message: 'No ticket entries found for this budget ID' });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
     
    }
  };

  
  updateTicketEntry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { message, fileUrl } = req.body;

      const updatedEntry = await this.ticketService.updateTicketEntry(id, { message, fileUrl });

      if (updatedEntry) {
        res.status(200).json(updatedEntry);
      } else {
        res.status(404).json({ message: 'Ticket entry not found' });
      }
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    
    }
  };

  
  deleteTicketEntry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deleted = await this.ticketService.deleteTicketEntry(id);

      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Ticket entry not found' });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
  
    }
  };
}