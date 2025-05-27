// src/routes/ticket.routes.ts

import { Router } from 'express';
import TicketController from '../controllers/TicketController';
import { Registry } from '../shared/di/DI';

export default class TicketRouter {
  private router: Router;
  private registry: Registry;
  private ticketController: TicketController;

  constructor() {
    this.router = Router();
    this.registry = Registry.getInstance();
    this.ticketController = this.registry.get('ticketController');

    this.router.post('/', (req, res, next) => this.ticketController.createTicketEntry(req, res, next));
    this.router.get('/', (req, res, next) => this.ticketController.getAllTicketEntries(req, res, next));
    this.router.get('/:id', (req, res, next) => this.ticketController.getTicketEntryById(req, res, next));
    this.router.get('/by-ticket/:ticketId', (req, res, next) => this.ticketController.getTicketEntriesByTicketId(req, res, next));
    this.router.get('/by-budget/:budgetId', (req, res, next) => this.ticketController.getTicketEntriesByBudgetId(req, res, next));
    this.router.put('/:id', (req, res, next) => this.ticketController.updateTicketEntry(req, res, next));
    this.router.delete('/:id', (req, res, next) => this.ticketController.deleteTicketEntry(req, res, next));
  }

  getRouter() {
    return this.router;
  }
}