import { db } from "@/database"
import { schema } from "@/database/schemas"
import { responseFail, responseSuccess } from "@/utils/api-response"
import { idSchema } from "@zod/id-uuid"
import { eq } from "drizzle-orm"
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
            const link = await db.select().from(schema.links).where(
                eq(schema.links.id, id)
            ).limit(1)

            if (link.length === 0) {
                return reply.status(404).send(responseFail("Link não encontrado"))
            }
            return reply.status(200).send(responseSuccess("Link encontrado com sucesso", link[0]))
        }
    )
}