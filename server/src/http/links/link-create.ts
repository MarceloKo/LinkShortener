import { responseFail, responseSuccess } from "@/utils/api-response"
import { PrismaService } from "@prisma/prisma-service"
import { urlShortSchema } from "@zod/url-short"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"


const linkSchema = z.object({
    urlDestination: z.string().url('Informe uma URL válida'),
    urlShort: urlShortSchema

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

