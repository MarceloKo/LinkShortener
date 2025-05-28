import { db } from "@/database"
import { schema } from "@/database/schemas"
import { responseFail, responseSuccess } from "@/utils/api-response"
import { urlShortSchema } from "@zod/url-short"
import { eq } from "drizzle-orm"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"


const linkSchema = z.object({
    urlDestination: z.string().url('Informe uma URL válida'),
    urlShort: urlShortSchema

})


export const LinkCreateRoute: FastifyPluginAsyncZod = async server => {
    server.post(
        '/link',
        {
            schema: {
                summary: 'Create a new link',
                description: 'Create a new link with a short URL and destination URL',
                tags: ['link'],
                body: linkSchema,
            },
        },
        async (req, reply) => {
            const { urlDestination, urlShort } = req.body


            const existUrl = await db.select().from(schema.links)
                .where(eq(schema.links.urlShort, urlShort)).limit(1)

            if (existUrl.length > 0) {
                return reply.status(400).send(responseFail("Link encurtado já existe"))
            }

            const newLink = await db.insert(schema.links).values({
                urlShort,
                urlDestination,
            }).returning()

            return reply.status(201).send(responseSuccess("Link criado com sucesso", newLink[0]))

        }
    )
}

