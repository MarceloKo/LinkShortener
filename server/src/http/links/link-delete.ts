import { db } from "@/database"
import { schema } from "@/database/schemas"
import { responseFail, responseSuccess } from "@/utils/api-response"
import { idSchema } from "@zod/id-uuid"
import { eq } from "drizzle-orm"
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

            const link = await db.select().from(schema.links)
                .where(eq(schema.links.id, id)).limit(1)

            if (link.length === 0) {
                return reply.status(404).send(responseFail("Link não encontrado"))
            }

            await db.delete(schema.links)
                .where(eq(schema.links.id, id))

            return reply.status(200).send(responseSuccess("Link deletado com sucesso", null))

        }
    )
}
