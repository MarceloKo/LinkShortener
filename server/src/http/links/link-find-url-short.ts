import { responseFail, responseSuccess } from "@/utils/api-response"
import { PrismaService } from "@prisma/prisma-service"
import { urlShortSchema } from "@zod/url-short"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"

export const LinkFindByUrlShortRoute: FastifyPluginAsyncZod = async server => {
    server.get(
        '/link/url-short/:url',
        {
            schema: {
                summary: 'Find a link by urlShort',
                description: 'Find a link by urlShort',
                tags: ['link'],
                params: z.object({
                    url: urlShortSchema
                })
            },
        },
        async (req, reply) => {
            const { url } = req.params
            const link = await PrismaService.links.findUnique({
                where: { urlShort: url }
            })

            if (!link) {
                return reply.status(404).send(responseFail("Link não encontrado"))
            }
            return reply.status(200).send(responseSuccess("Link encontrado com sucesso", link))
        }
    )
}