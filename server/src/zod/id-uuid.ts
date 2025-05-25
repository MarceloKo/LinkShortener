import { z } from "zod";

export const idSchema = z.string({
    required_error: 'Informe o ID',
    invalid_type_error: 'O ID deve ser uma string'
}).uuid('Informe um ID válido')
