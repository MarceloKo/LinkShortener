import { z } from 'zod'

export const linkSchema = z.object({
    originalUrl: z.string().url('Digite uma URL válida'),
    shortUrl: z.string().min(3, 'Informe um link encurtado'),
})

export type LinkFormData = z.infer<typeof linkSchema>