import { responseFail, responseSuccess } from "@/utils/api-response"
import { PrismaService } from "@prisma/prisma-service"
import { idSchema } from "@zod/id-uuid"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"

export const LinkFindByIdRoute: FastifyPluginAsyncZod = async server => {
    server.get(
        '/link/:id',
        {
            schema: {
                summary: 'Find a link by ID',
                description: 'Find a link by ID',
                tags: ['link'],
                params: z.object({ id: idSchema })
            },
        },
        async (req, reply) => {
            const { id } = req.params
            const link = await PrismaService.links.findUnique({
                where: { id }
            })
            if (!link) {
                return reply.status(404).send(responseFail("Link não encontrado"))
            }
            return reply.status(200).send(responseSuccess("Link encontrado com sucesso", link))
        }
    )
}