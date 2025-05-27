import { responseFail, responseSuccess } from "@/utils/api-response"
import { PrismaService } from "@prisma/prisma-service"
import { idSchema } from "@zod/id-uuid"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"




export const LinkIncrementAccessCountRoute: FastifyPluginAsyncZod = async server => {
    server.post(
        '/link/:id/increment-access',
        {
            schema: {
                summary: 'Increment access count',
                description: 'Increment access count for a link',
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

            const linkUpdated = await PrismaService.links.update({
                where: { id },
                data: {
                    countAccess: { increment: 1 }
                }
            })


            return reply.status(200).send(responseSuccess("Contador de acessos atualizado com sucesso", linkUpdated))
        }
    )
}