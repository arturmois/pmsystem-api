import z from 'zod'

export const CreateProjectSchema = z.object({
    title: z.string(),
    startDate: z.string(),
});

export const UpdateProjectSchema = z.object({
    title: z.string(),
    startDate: z.string(),
});
