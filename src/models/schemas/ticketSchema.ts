import { z } from "zod";

export const CreateTicketSchema = z.object({
  budgetId: z.string().uuid({ message: "budgetId must be a valid UUID" }),
  message: z.string().min(1, { message: "Message cannot be empty" }),
  fileUrl: z.string().optional(),
});

export const UpdateTicketSchema = z.object({
  message: z
    .string()
    .min(1, { message: "Message cannot be empty" })
    .optional(),
  fileUrl: z
    .string()
    .url({ message: "fileUrl should be a valid URL" })
    .optional(),
});

export const UploadTicketSchema = z.object({
  fileName: z.string().min(1, { message: "fileName cannot be empty" }),
  fileType: z.string().refine((val) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    return allowedTypes.includes(val);
  }, { message: "fileType should be an image or a PDF" }),
});
