import { env } from '@/zod/env'
import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'


import handleError from './utils/api-handle-errors'
import { LinkCreateRoute } from './http/links/link-create'
import { LinkDeleteRoute } from './http/links/link-delete'
import { LinkFindAllRoute } from './http/links/link-find-all'
import { LinkFindByIdRoute } from './http/links/link-find'
import { LinkIncrementAccessCountRoute } from './http/links/link-increment-access'
import { ExportAllLinksToCsvRoute } from './http/reports/export-all-links-to-csv'
import { LinkFindByUrlShortRoute } from './http/links/link-find-url-short'
const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)
server.setErrorHandler(handleError)
server.register(fastifyCors, { origin: [env.DOMAIN_WEB] })

server.register(fastifySwagger, {
	logLevel: 'silent',
	openapi: {
		info: {
			title: 'LinkShortner API',
			version: '1.0.0',
		},
		servers: [],
	},
	transform: jsonSchemaTransform,
})
server.register(fastifySwaggerUi, {
	routePrefix: '/swagger',
	logLevel: 'silent',
})


server.get('/', async (_, reply) => reply.send({
	message: 'API is running',
}))

server.register(LinkCreateRoute)
server.register(LinkDeleteRoute)
server.register(LinkFindAllRoute)
server.register(LinkFindByIdRoute)
server.register(LinkFindByUrlShortRoute)
server.register(LinkIncrementAccessCountRoute)
server.register(ExportAllLinksToCsvRoute)


server
	.listen({ port: env.PORT || 8000, host: '0.0.0.0' })
	.then(async () => {
		console.info(`[ 🚀 RUNNING MODE ]: ${env.NODE_ENV.toUpperCase()}\n`)
	})
	.catch(async err => {
		console.error(err)
	})
