import { z } from "zod";

export const createTicketSchema = z.object({
  budgetId: z.string().uuid({ message: "budgetId deve ser um UUID válido" }),
  userId: z.string().uuid({ message: "userId deve ser um UUID válido" }),
  message: z.string().min(1, { message: "A mensagem não pode estar vazia" }),
  fileUrl: z.string().url({ message: "fileUrl deve ser uma URL válida" }),
});

export const updateTicketSchema = z.object({
  message: z
    .string()
    .min(1, { message: "A mensagem não pode estar vazia" })
    .optional(),
  fileUrl: z
    .string()
    .url({ message: "fileUrl deve ser uma URL válida" })
    .optional(),
});
