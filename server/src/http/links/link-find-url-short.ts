import { db } from "@/database"
import { schema } from "@/database/schemas"
import { responseFail, responseSuccess } from "@/utils/api-response"
import { urlShortSchema } from "@zod/url-short"
import { eq } from "drizzle-orm"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"

export const LinkFindByUrlShortRoute: FastifyPluginAsyncZod = async server => {
    server.get(
        '/link/url-short/:url',
        {
            schema: {
                summary: 'Find a link by urlShort',
                description: 'Find a link by urlShort',
                tags: ['link'],
                params: z.object({
                    url: urlShortSchema
                })
            },
        },
        async (req, reply) => {
            const { url } = req.params
            const link = await db.select().from(schema.links).where(
                eq(schema.links.urlShort, url)
            ).limit(1)

            if (link.length === 0) {
                return reply.status(404).send(responseFail("Link não encontrado"))
            }
            return reply.status(200).send(responseSuccess("Link encontrado com sucesso", link[0]))
        }
    )
}