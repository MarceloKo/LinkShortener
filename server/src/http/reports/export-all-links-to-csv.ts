import { db, pg } from "@/database"
import { schema } from "@/database/schemas"
import { uploadFileToStorage } from "@/functions/storage/upload-file-to-storage"
import { responseSuccess } from "@/utils/api-response"
import { uuidV7ToDate } from "@/utils/uuid-to-date"
import { stringify } from "csv-stringify"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { PassThrough, Transform } from "node:stream"
import { pipeline } from "node:stream/promises"

type Link = typeof schema.links.$inferSelect

export const ExportAllLinksToCsvRoute: FastifyPluginAsyncZod = async server => {
    server.get(
        '/export-links/csv',
        {
            schema: {
                summary: 'Export all links to CSV',
                description: 'Export all links to CSV',
                tags: ['export'],
            },
        },
        async (_, reply) => {
            const { sql, params } = db
                .select()
                .from(schema.links)
                .toSQL()

            const cursor = pg.unsafe(sql, params as string[]).cursor(50)


            const csv = stringify({
                header: true,
                columns: [{
                    key: 'urlDestination',
                    header: 'URL de destino',
                }, {
                    key: 'urlShort',
                    header: 'URL encurtada',
                }, {
                    key: 'countAccess',
                    header: 'Contagem de acessos',
                }, {
                    key: 'createdAt',
                    header: 'Data de criacao',
                }],
                delimiter: ',',
            })

            const uploadToStorageStream = new PassThrough()

            const convertToCSVPipeline = pipeline(
                cursor,
                new Transform({
                    objectMode: true,
                    transform(chunks: Link[], _, callback) {
                        for (const chunk of chunks) {
                            this.push({
                                ...chunk,
                                createdAt: uuidV7ToDate(chunk.id)?.toISOString()
                            })
                        }
                        callback()
                    },
                }),
                csv,
                uploadToStorageStream
            )

            const uploadPromise = uploadFileToStorage({
                contentType: 'text/csv',
                folder: 'reports-links',
                fileName: `${new Date().toISOString()}.csv`,
                contentStream: uploadToStorageStream,
            })
            const [{ url }] = await Promise.all([uploadPromise, convertToCSVPipeline])

            return reply.status(200).send(
                responseSuccess("Links exported successfully", {
                    fileUrl: url,
                })
            )
        }
    )
}