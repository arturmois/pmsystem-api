import z from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  birthDate: z.string().transform(str => new Date(str)),
  role: z.enum(['E', 'P', 'G'])
});

export const professionalSchema = userSchema.extend({
  name: z.string(),
  preferredName: z.string().optional().default(''),
  cpf: z.string().length(11),
  type: z.string(),
  desk: z.string()
});

export const companySchema = userSchema.extend({
  cnpj: z.string().length(14),
  address: z.string(),
  fantasyName: z.string(),
  socialReason: z.string(),
  segment: z.string(),
  monthlyFee: z.number(),
  commission: z.number()
});