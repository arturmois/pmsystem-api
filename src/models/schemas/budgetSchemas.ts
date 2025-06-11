import z from 'zod';

export const CreateBudgetSchema = z.object({
    projectId: z.string().uuid(),
    companyId: z.string().uuid().optional(),
    description: z.string().min(1),
    status: z.enum(['pending', 'approved', 'rejected', 'finished']).default('pending'),
});

export const UpdateBudgetSchema = z.object({
    description: z.string().min(1).optional(),
    status: z.enum(['pending', 'approved', 'rejected', 'finished']).default('pending').optional(),
});

