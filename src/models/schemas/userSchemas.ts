import z from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  birthDate: z.string().datetime().transform(str => new Date(str)),
  role: z.enum(['E', 'P', 'G']),
  phoneNumber: z.string().optional().default(''),
  address: z.string().optional().default('')
});

export const professionalSchema = userSchema.extend({
  cpf: z.string().length(11),
  name: z.string(),
  gender: z.string(),
  activityArea: z.string(),
  preferredName: z.string().optional().default(''),
  professionalRegistration: z.string().optional().default(''),
  socialNetwork: z.string().optional().default(''),
  desk: z.string().optional().default('')
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