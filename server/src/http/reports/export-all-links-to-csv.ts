import { responseSuccess } from "@/utils/api-response"
import { PrismaService } from "@prisma/prisma-service"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"

export const ExportAllLinksToCsvRoute: FastifyPluginAsyncZod = async server => {
    server.post(
        '/export-links/csv',
        {
            schema: {
                summary: 'Export all links to CSV',
                description: 'Export all links to CSV',
                tags: ['export'],
            },
        },
        async (_req, reply) => {
            const _links = await PrismaService.links.findMany({})
            return reply.status(200).send(responseSuccess("Links encontrados com sucesso", _links))
        }
    )
}