import { responseFail, responseSuccess } from "@/utils/api-response"
import { PrismaService } from "@prisma/prisma-service"
import { idSchema } from "@zod/id-uuid"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"


export const LinkDeleteRoute: FastifyPluginAsyncZod = async server => {
    server.delete(
        '/link/:id',
        {
            schema: {
                summary: 'Delete a link',
                description: 'Delete a link by its ID',
                tags: ['link'],
                params: z.object({ id: idSchema }),
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

            await PrismaService.links.delete({
                where: { id }
            })

            return reply.status(200).send(responseSuccess("Link deletado com sucesso", null))

        }
    )
}
