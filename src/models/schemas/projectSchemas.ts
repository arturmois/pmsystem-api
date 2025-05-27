import z from 'zod'

const schemaCreate = z.object({
    projectId: z.string(),
    professionalId: z.string(),
    title: z.string(),
    startDate: z.string(),
});

const schemaUpdate = z.object({
    projectId: z.string(),
    title: z.string(),
    startDate: z.string(),
});

export { schemaCreate, schemaUpdate };