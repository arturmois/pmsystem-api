import { z } from "zod";

export const CreateSaleSchema = z.object({
  saleId: z.string(),
  budgetId: z.string(),
  companyId: z.string(),
  value: z.number(),
});

export const UpdateSaleSchema = z.object({
  saleId: z.string(),
  budgetId: z.string(),
  companyId: z.string(),
  value: z.number(),
});
