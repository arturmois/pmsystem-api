import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const registerProfessionalSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  birthDate: z.coerce.date().refine(date => date < new Date(), {
    message: "Data de nascimento inválida"
  }),
  type: z.enum(['E', 'P', 'G'])
});

export type RegisterProfessionalSchema = z.infer<typeof registerProfessionalSchema>;