// src/services/ticket.service.ts

import { TicketRepository, TicketEntryPrismaType } from '../../repositories/ticket.repository';
import { validate as uuidValidate } from 'uuid';

export class TicketService {
  private ticketRepository: TicketRepository;

  constructor() {
    this.ticketRepository = new TicketRepository();
  }


  async createTicketEntry(data: { ticketId: string; budgetId: string; userId: string; message: string; fileUrl?: string | null }): Promise<TicketEntryPrismaType> {
    if (!data.message || data.message.trim() === '') {
      throw new Error('Message content cannot be empty.');
    }
    if (!uuidValidate(data.ticketId) || !uuidValidate(data.budgetId) || !uuidValidate(data.userId)) {
      throw new Error('Invalid UUID format for ticketId, budgetId, or userId.');
    }

    const newEntry = await this.ticketRepository.create(data);
    return newEntry;
  }

 
  async getTicketEntryById(id: string): Promise<TicketEntryPrismaType | null> {
    if (!uuidValidate(id)) {
      throw new Error('Invalid ID format.');
    }
    return this.ticketRepository.findById(id);
  }


  async getAllTicketEntries(): Promise<TicketEntryPrismaType[]> {
    return this.ticketRepository.findAll();
  }


  async updateTicketEntry(id: string, updateData: { message?: string; fileUrl?: string | null }): Promise<TicketEntryPrismaType | null> {
    if (!uuidValidate(id)) {
      throw new Error('Invalid ID format.');
    }
    if (updateData.message !== undefined && updateData.message.trim() === '') {
      throw new Error('Message content cannot be empty on update.');
    }
    return this.ticketRepository.update(id, updateData);
  }


  async deleteTicketEntry(id: string): Promise<boolean> {
    if (!uuidValidate(id)) {
      throw new Error('Invalid ID format.');
    }
    return this.ticketRepository.delete(id);
  }


  async getTicketEntriesByTicketId(ticketId: string): Promise<TicketEntryPrismaType[]> {
    if (!uuidValidate(ticketId)) {
      throw new Error('Invalid ticket ID format.');
    }
    return this.ticketRepository.findByTicketId(ticketId);
  }


  async getTicketEntriesByBudgetId(budgetId: string): Promise<TicketEntryPrismaType[]> {
    if (!uuidValidate(budgetId)) {
      throw new Error('Invalid budget ID format.');
    }
    return this.ticketRepository.findByBudgetId(budgetId);
  }


  async getTicketEntriesByUserId(userId: string): Promise<TicketEntryPrismaType[]> {
    if (!uuidValidate(userId)) {
      throw new Error('Invalid user ID format.');
    }
    return this.ticketRepository.findByUserId(userId);
  }
}