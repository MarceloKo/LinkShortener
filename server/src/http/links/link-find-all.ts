import { db } from "@/database"
import { schema } from "@/database/schemas"
import { responseSuccess } from "@/utils/api-response"
import { desc } from "drizzle-orm"
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
            const link = await db.select().from(schema.links).orderBy(desc(schema.links.id))

            return reply.status(200).send(responseSuccess("Links encontrados com sucesso", link))

        }
    )
}
