import z from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  birthDate: z.string().datetime().transform(str => new Date(str)),
  role: z.enum(['P', 'C', 'G']),
  phoneNumber: z.string().optional().default(''),
  address: z.string().optional().default('')
});

export const CreateProfessionalSchema = CreateUserSchema.extend({
  cpf: z.string().length(11),
  name: z.string(),
  gender: z.string(),
  activityArea: z.string(),
  preferredName: z.string().optional().default(''),
  professionalRegistration: z.string().optional().default(''),
  socialNetwork: z.string().optional().default(''),
  desk: z.string().optional().default('')
});

export const CreateCompanySchema = CreateUserSchema.extend({
  cnpj: z.string().length(14),
  fantasyName: z.string(),
  socialReason: z.string(),
  segment: z.string(),
  monthlyFee: z.number(),
  commission: z.number(),
  platform1: z.string().optional().default(''),
  platform2: z.string().optional().default('')
});