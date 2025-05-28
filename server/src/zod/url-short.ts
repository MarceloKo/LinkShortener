import { z } from "zod";

export const urlShortSchema = z.string({
    message: 'Informe o link encurtado',
}).min(1, {
    message: 'Informe o link encurtado',
}).regex(/^[a-zA-Z0-9_-]+$/, {
    message: 'O link encurtado deve conter apenas letras, números, hífen (-) e sublinhado (_)',
}).max(40, {
    message: 'O link encurtado deve ter no máximo 40 caracteres',
}).transform((value) => value.toLowerCase())
    .refine((value) => {
        if (value.startsWith('http://') || value.startsWith('https://')) {
            return false;
        }
        return true;
    }, "O link encurtado deve somente conter o caminho, sem o protocolo e domínio. Exemplo: 'url-encurtada' ao invés de 'https://meu-link.com/url-encurtada'");