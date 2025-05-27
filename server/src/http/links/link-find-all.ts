import { responseSuccess } from "@/utils/api-response"
import { PrismaService } from "@prisma/prisma-service"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"


export const LinkFindAllRoute: FastifyPluginAsyncZod = async server => {
    server.get(
        '/link',
        {
            schema: {
                summary: 'Find all links',
                description: 'Find all links ',
                tags: ['link'],
            },
        },
        async (_, reply) => {
            const link = await PrismaService.links.findMany({
                orderBy: {
                    id: 'desc'
                }
            })
            return reply.status(200).send(responseSuccess("Links encontrados com sucesso", link))

        }
    )
}
