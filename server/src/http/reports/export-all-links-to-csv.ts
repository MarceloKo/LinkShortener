import { uploadFileToStorage } from "@/functions/storage/upload-file-to-storage"
import { responseSuccess } from "@/utils/api-response"
import { uuidV7ToDate } from "@/utils/uuid-to-date"
import { PrismaService } from "@prisma/prisma-service"
import { env } from "@zod/env"
import { stringify } from "csv-stringify"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { PassThrough, Readable } from "node:stream"
import { pipeline } from "node:stream/promises"

export const ExportAllLinksToCsvRoute: FastifyPluginAsyncZod = async server => {
    server.post(
        '/export-links/csv',
        {
            schema: {
                summary: 'Export all links to CSV',
                description: 'Export all links to CSV',
                tags: ['export'],
            },
        },
        async (_, reply) => {
            const take = 1000
            const dataStream = Readable.from(
                (async function* () {
                    let cursor: string | undefined

                    while (true) {
                        const batch = await PrismaService.links.findMany({
                            take,
                            skip: cursor ? 1 : 0,
                            cursor: cursor ? { id: cursor } : undefined,
                            orderBy: { id: 'asc' },
                        })

                        if (batch.length === 0) break

                        for (const row of batch) yield [row.urlDestination, `${env.DOMAIN_WEB}/${row.urlShort}`, row.countAccess, uuidV7ToDate(row.id)?.toISOString()]

                        if (batch.length < take) break
                        cursor = batch[batch.length - 1].id
                    }
                })()
            )

            const pass = new PassThrough()

            const csvStringifier = stringify({
                header: true,
                columns: ['URL Original', 'URL Encurtada', 'Contagem de Acessos', 'Data de Criacao'],
                delimiter: ',',
            })

            const uploadPromise = uploadFileToStorage({
                contentType: 'text/csv',
                folder: 'reports-links',
                fileName: `${new Date().toISOString()}.csv`,
                contentStream: pass,
            })

            const convertLinksToCSV = pipeline(dataStream, csvStringifier, pass)

            const [{ url }] = await Promise.all([uploadPromise, convertLinksToCSV])

            return reply.status(200).send(
                responseSuccess("Links exported successfully", {
                    fileUrl: url,
                })
            )
        }
    )
}