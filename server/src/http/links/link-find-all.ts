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
        async (_req, reply) => {
            const link = await PrismaService.links.findMany()
            return reply.status(200).send(responseSuccess("Links encontrados com sucesso", link))

        }
    )
}
