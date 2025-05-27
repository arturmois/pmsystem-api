// src/models/ticket.model.ts

import { v4 as uuidv4 } from 'uuid'; 

export class Ticket {
  private ticketId: string;
  private budgetId: string;
  private userId: string;
  private message: string;
  private fileUrl?: string; 
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    budgetId: string,
    userId: string,
    message: string,
    fileUrl?: string, 
    ticketId?: string, 
    createdAt?: Date, 
    updatedAt?: Date 
  ) {
    
    this.ticketId = ticketId || uuidv4();
    this.budgetId = budgetId;
    this.userId = userId;
    this.message = message;
    this.fileUrl = fileUrl;
   
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   getTicketId(): string {
    return this.ticketId;
  }

  getBudgetId(): string {
    return this.budgetId;
  }

  getUserId(): string {
    return this.userId;
  }

  getMessage(): string {
    return this.message;
  }

  getFileUrl(): string | undefined { 
    return this.fileUrl;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  
  setMessage(newMessage: string) {
    this.message = newMessage;
    this.updatedAt = new Date();
  }

  
  setFileUrl(newFileUrl: string | undefined) {
    this.fileUrl = newFileUrl;
    this.updatedAt = new Date();
  }

 
  toJSON() {
    return {
      ticket_id: this.ticketId,
      budget_id: this.budgetId,
      user_id: this.userId,
      message: this.message,
      file_url: this.fileUrl,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}