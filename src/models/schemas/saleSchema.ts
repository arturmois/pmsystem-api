import { z } from "zod";

// sale_id: sale.getSaleId(),
//         budget_id: sale.getBudgetId(),
//         company_id: sale.getCompanyId(),
//         value: sale.getValue(),

const schemaCreateSale = z.object({
  saleId: z.string(),
  budgetId: z.string(),
  companyId: z.string(),
  value: z.number(),
});

const schemaUpdateSale = z.object({
  saleId: z.string(),
  budgetId: z.string(),
  companyId: z.string(),
  value: z.number(),
});
