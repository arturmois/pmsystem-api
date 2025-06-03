import { Ticket } from "../../models/entities/Ticket";
import TicketRepository from "../../repositories/TicketRepository";
import { inject } from "../../shared/di/DI";

export default class TicketService {
  @inject("ticketRepository") private ticketRepository!: TicketRepository;

  async createTicket(data: any) {
    const ticket = await Ticket.modelCreateTicket(data);
    return await this.ticketRepository.create(ticket);
  }

  async getAllTickets() {
    return await this.ticketRepository.findAll();
  }

  async getTicketById(id: string) {
    return await this.ticketRepository.findById(id);
  }

  async updateTicket(
    id: string,
    data: Partial<{ message: string; fileUrl: string }>
  ) {
    return await this.ticketRepository.update(id, data);
  }

  async deleteTicket(id: string) {
    return await this.ticketRepository.delete(id);
  }
}
