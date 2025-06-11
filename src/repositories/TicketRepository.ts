import Ticket from "../models/entities/Ticket";
import { PrismaClient } from "@prisma/client";
import { inject } from "../shared/di/DI";

export default class TicketRepository {
  @inject("prisma")
  private prisma!: PrismaClient;

  async create(ticket: Ticket) {
    return await this.prisma.ticket.create({
      data: {
        ticket_id: ticket.getTicketId(),
        budget_id: ticket.getBudgetId(),
        user_id: ticket.getUserId(),
        message: ticket.getMessage(),
        file_url: ticket.getFileUrl(),
      },
    });
  }

  async findAll() {
    return await this.prisma.ticket.findMany();
  }

  async findById(ticketId: string) {
    return await this.prisma.ticket.findUnique({
      where: { ticket_id: ticketId },
    });
  }

  async update(
    ticketId: string,
    data: Partial<{ message: string; fileUrl: string }>
  ) {
    return await this.prisma.ticket.update({
      where: { ticket_id: ticketId },
      data: {
        message: data.message,
        file_url: data.fileUrl,
      },
    });
  }

  async delete(ticketId: string) {
    return await this.prisma.ticket.delete({
      where: { ticket_id: ticketId },
    });
  }

}
