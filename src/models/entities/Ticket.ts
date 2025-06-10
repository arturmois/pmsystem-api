import crypto from "crypto";

export default class Ticket {
  private ticketId: string;
  private budgetId: string;
  private userId: string;
  private message: string;
  private fileUrl: string;

  constructor(
    ticketId: string,
    budgetId: string,
    userId: string,
    message: string,
    fileUrl: string,
  ) {
    this.ticketId = ticketId;
    this.budgetId = budgetId;
    this.userId = userId;
    this.message = message;
    this.fileUrl = fileUrl;
  }

  static async create(budgetId: string, userId: string, message: string, fileUrl: string) {
    const ticketId = crypto.randomUUID();
    return new Ticket(ticketId, budgetId, userId, message, fileUrl);
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

}
