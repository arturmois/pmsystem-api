import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  birthDate: z.coerce.date().refine(date => date < new Date(), {
    message: "Data de nascimento inválida"
  }),
  type: z.enum(['E', 'P', 'G'])
});
