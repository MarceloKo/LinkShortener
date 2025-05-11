import { z } from 'zod'

export const linkSchema = z.object({
    originalUrl: z.string().url('Informe uma URL válida'),
    shortUrl: z.string({
        message: 'Informe o link encurtado',
    }).min(1, {
        message: 'Informe o link encurtado',
    }).regex(/^[a-zA-Z0-9]+$/, {
        message: 'O link encurtado deve conter apenas letras e números',
    }).max(20, {
        message: 'O link encurtado deve ter no máximo 20 caracteres',
    }).transform((value) => value.toLowerCase())
})

export type LinkFormData = z.infer<typeof linkSchema>;
