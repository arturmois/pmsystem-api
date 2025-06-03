import crypto from "crypto";

export class Ticket {
  private ticketId: string;
  private budgetId: string;
  private userId: string;
  private message: string;
  private fileUrl: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    ticketId: string,
    budgetId: string,
    userId: string,
    message: string,
    fileUrl: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.ticketId = ticketId;
    this.budgetId = budgetId;
    this.userId = userId;
    this.message = message;
    this.fileUrl = fileUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async modelCreateTicket(data: any) {
    const ticketId = crypto.randomUUID();
    const now = new Date();
    return new Ticket(
      ticketId,
      data.budgetId,
      data.userId,
      data.message,
      data.fileUrl,
      now,
      now
    );
  }

  getTicketId() {
    return this.ticketId;
  }

  getBudgetId() {
    return this.budgetId;
  }

  getUserId() {
    return this.userId;
  }

  getMessage() {
    return this.message;
  }

  getFileUrl() {
    return this.fileUrl;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }
}
