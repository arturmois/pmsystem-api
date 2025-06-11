import { z } from "zod";

export const CreateTicketSchema = z.object({
  budgetId: z.string().uuid({ message: "budgetId must be a valid UUID" }),
  message: z.string().min(1, { message: "Message cannot be empty" }),
  fileUrl: z.string().optional(),
});

export const UpdateTicketSchema = z.object({
  message: z
    .string()
    .min(1, { message: "A mensagem não pode estar vazia" })
    .optional(),
  fileUrl: z
    .string()
    .url({ message: "fileUrl deve ser uma URL válida" })
    .optional(),
});
