import { PrismaClient, Ticket as PrismaTicket } from "../../generated/prisma";
import Ticket from "../models/entities/Ticket";
import { inject } from "../shared/di/DI";
import console from "console";

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

  async findAll(budgetId: string | undefined) {
    const tickets = await this.prisma.ticket.findMany({
      where: {
        budget_id: budgetId
      }
    });
    return tickets.map((ticket: PrismaTicket) => {
      return {
        ticketId: ticket.ticket_id,
        budgetId: ticket.budget_id,
        userId: ticket.user_id,
        message: ticket.message,
        fileUrl: ticket.file_url,
      }
    });
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
