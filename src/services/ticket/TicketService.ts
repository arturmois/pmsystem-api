import Ticket from "../../models/entities/Ticket";
import TicketRepository from "../../repositories/TicketRepository";
import { inject } from "../../shared/di/DI";
import UserRepository from "../../repositories/UserRepository";
import AppError from "../../shared/errors/AppError";
import BudgetRepository from "../../repositories/BudgetRepository";
import s3Client from "../../config/aws-config";
import { IDRIVE_BUCKET_NAME } from "../../config/env";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";

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

  async getAll(budgetId: string) {
    return await this.ticketRepository.findAll(budgetId);
  }

  async getById(id: string) {
    return await this.ticketRepository.findById(id);
  }

  async update(id: string, data: Partial<{ message: string; fileUrl: string }>) {
    return await this.ticketRepository.update(id, data);
  }

  async delete(id: string) {
    return await this.ticketRepository.delete(id);
  }

  async upload(ticketId: string, fileName: string, fileType: any) {
    const ticket = await this.ticketRepository.findById(ticketId);
    if (!ticket) {
      throw new AppError('Ticket not found', 404);
    }
    const command = new PutObjectCommand({
      Bucket: IDRIVE_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
      ACL: 'private'
    });
    try {
      const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
      return {
        url: presignedUrl,
        method: 'PUT'
      };
    } catch (error) {
      console.log(error);
      throw new AppError('Failed to generate presigned URL', 500);
    }
  }
}
