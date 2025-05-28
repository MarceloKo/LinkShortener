import { db } from "@/database"
import { schema } from "@/database/schemas"
import { responseFail, responseSuccess } from "@/utils/api-response"
import { idSchema } from "@zod/id-uuid"
import { eq, sql } from "drizzle-orm"
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
            const link = await db.select().from(schema.links).where(
                eq(schema.links.id, id)
            ).limit(1)


            if (link.length === 0) {
                return reply.status(404).send(responseFail("Link não encontrado"))
            }

            const linkUpdated = await db.update(schema.links).set({
                countAccess: sql`${schema.links.countAccess} + 1`
            }).where(
                eq(schema.links.id, id)
            )

            return reply.status(200).send(responseSuccess("Contador de acessos atualizado com sucesso", linkUpdated))
        }
    )
}