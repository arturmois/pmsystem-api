// src/repositories/ticket.repository.ts

import { PrismaClient } from '@prisma/client';
import { validate as uuidValidate } from 'uuid'; 

const prisma = new PrismaClient();

export type TicketEntryPrismaType = NonNullable<Awaited<ReturnType<typeof prisma.ticketEntry.findFirst>>>;

export class TicketRepository {

  async create(data: { ticketId: string; budgetId: string; userId: string; message: string; fileUrl?: string | null }): Promise<TicketEntryPrismaType> {
    const newTicketEntry = await prisma.ticketEntry.create({
      data: {
        ticketId: data.ticketId,
        budgetId: data.budgetId,
        userId: data.userId,
        message: data.message,
        fileUrl: data.fileUrl,
      },
    });
    return newTicketEntry;
  }


  async findById(id: string): Promise<TicketEntryPrismaType | null> {
    const ticketEntry = await prisma.ticketEntry.findUnique({
      where: { id: id },
    });
    return ticketEntry;
  }


  async findAll(): Promise<TicketEntryPrismaType[]> {
    const ticketEntries = await prisma.ticketEntry.findMany();
    return ticketEntries;
  }


  async update(id: string, updateData: Partial<{ message: string; fileUrl?: string | null }>): Promise<TicketEntryPrismaType | null> {
    try {
      const updatedTicketEntry = await prisma.ticketEntry.update({
        where: { id: id },
        data: {
          message: updateData.message,
          fileUrl: updateData.fileUrl,
        },
      });
      return updatedTicketEntry;
    } catch (error: any) {
      if (error.code === 'P2025') {
        return null;
      }
      throw error;
    }
  }

 
  async delete(id: string): Promise<boolean> {
    try {
      await prisma.ticketEntry.delete({
        where: { id: id },
      });
      return true;
    } catch (error: any) {
      if (error.code === 'P2025') {
        return false;
      }
      throw error;
    }
  }

  
  async findByTicketId(ticketId: string): Promise<TicketEntryPrismaType[]> {
    const ticketEntries = await prisma.ticketEntry.findMany({
      where: { ticketId: ticketId },
      orderBy: { createdAt: 'asc' }, // Ordena por data de criação
    });
    return ticketEntries;
  }

  
  async findByBudgetId(budgetId: string): Promise<TicketEntryPrismaType[]> {
    const ticketEntries = await prisma.ticketEntry.findMany({
      where: { budgetId: budgetId },
      orderBy: { createdAt: 'asc' },
    });
    return ticketEntries;
  }

  async findByUserId(userId: string): Promise<TicketEntryPrismaType[]> {
    const ticketEntries = await prisma.ticketEntry.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'asc' },
    });
    return ticketEntries;
  }
}