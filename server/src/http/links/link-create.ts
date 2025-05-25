import { responseFail, responseSuccess } from "@/utils/api-response"
import { PrismaService } from "@prisma/prisma-service"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"


const linkSchema = z.object({
    urlDestination: z.string().url('Informe uma URL válida'),
    urlShort: z.string({
        message: 'Informe o link encurtado',
    }).min(1, {
        message: 'Informe o link encurtado',
    }).regex(/^[a-zA-Z0-9]+$/, {
        message: 'O link encurtado deve conter apenas letras e números',
    }).max(20, {
        message: 'O link encurtado deve ter no máximo 20 caracteres',
    }).refine((value) => {
        return value.startsWith('/')
    }, { message: 'O link encurtado deve começar com uma barra (/)' })
        .transform((value) => value.toLowerCase())

})


export const LinkCreateRoute: FastifyPluginAsyncZod = async server => {
    server.post(
        '/link',
        {
            schema: {
                summary: 'Create a new link',
                description: 'Create a new link with a short URL and destination URL',
                tags: ['link'],
                body: linkSchema,
            },
        },
        async (req, reply) => {
            const { urlDestination, urlShort } = req.body


            const existUrl = await PrismaService.links.findFirst({
                where: { urlShort }
            })

            if (existUrl) {
                return reply.status(400).send(responseFail("Link encurtado já existe"))
            }

            const newLink = await PrismaService.links.create({
                data: {
                    urlDestination,
                    urlShort
                }
            })

            return reply.status(201).send(responseSuccess("Link criado com sucesso", newLink))

        }
    )
}

