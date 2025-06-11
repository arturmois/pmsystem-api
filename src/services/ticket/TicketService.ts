import Ticket from "../../models/entities/Ticket";
import TicketRepository from "../../repositories/TicketRepository";
import { inject } from "../../shared/di/DI";
import UserRepository from "../../repositories/UserRepository";
import AppError from "../../shared/errors/AppError";
import BudgetRepository from "../../repositories/BudgetRepository";

export default class TicketService {
  @inject("ticketRepository")
  private ticketRepository!: TicketRepository;
  @inject('userRepository')
  private userRepository!: UserRepository;
  @inject('budgetRepository')
  private budgetRepository!: BudgetRepository;

  private allowedRoles = ['PROFESSIONAL', 'COMPANY'];

  async create(input: any) {
    const user = await this.userRepository.getById(input.userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    if (!this.allowedRoles.includes(user.getRole())) {
      throw new AppError('User is not allowed to create a ticket', 403);
    }
    const budget = await this.budgetRepository.getById(input.budgetId);
    if (!budget) {
      throw new AppError('Budget not found', 404);
    }
    const ticket = await Ticket.create(budget.budget_id, user.getUserId(), input.message, input.fileUrl);
    await this.ticketRepository.create(ticket);
    return {
      ticketId: ticket.getTicketId()
    }
  }

  async getAll() {
    return await this.ticketRepository.findAll();
  }

  async getById(id: string) {
    return await this.ticketRepository.findById(id);
  }

  async update(
    id: string,
    data: Partial<{ message: string; fileUrl: string }>
  ) {
    return await this.ticketRepository.update(id, data);
  }

  async delete(id: string) {
    return await this.ticketRepository.delete(id);
  }
}
