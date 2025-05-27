import { z } from 'zod'

export const linkSchema = z.object({
    urlDestination: z.string({
        message: 'Informe o link original',
        required_error: 'Informe o link original',
        invalid_type_error: 'O link original deve ser uma string',
    }).url('Informe uma URL válida'),
    urlShort: z.string({
        message: 'Informe o link encurtado',
        invalid_type_error: 'O link encurtado deve ser uma string',
        required_error: 'Informe o link encurtado',
    }).min(1, {
        message: 'Informe o link encurtado',
    }).regex(/^[a-zA-Z0-9]+$/, {
        message: 'O link encurtado deve conter apenas letras e números',
    }).max(20, {
        message: 'O link encurtado deve ter no máximo 20 caracteres',
    }).transform((value) => value.toLowerCase())
})

export type LinkFormData = z.infer<typeof linkSchema>;
