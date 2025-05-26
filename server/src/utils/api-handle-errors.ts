import { Prisma } from '@prisma/client'
import { AxiosError } from 'axios'
import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { responseFail } from './api-response'

export default function handleError(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
	const dataError = {
		message: error.message,
		messageErro: error.stack,
		url: request.url,
		method: request.method,
		body: request.body,
		headers: request.headers,
		ip: request.ip,
		hostname: request.hostname,
	}
	if (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {

			console.log(`🔥 [ERROR PRISMA] ${error?.message}`)
			dataError.messageErro = error?.message || 'Erro interno CODE:1'

			dataError.message = 'Erro ao realizar requisição ao banco de dados'

			return reply.status(400).send(responseFail([error?.message || 'Erro interno CODE:1']))
		}
		if (error instanceof AxiosError) {
			const errorMessage = JSON.stringify(error.response?.data)
			dataError.messageErro = errorMessage
			console.log(`🔥 [ERROR AXIOS] ${errorMessage}`)
			dataError.message = 'Erro ao realizar requisição a API'

			return reply.status(400).send(responseFail([errorMessage]))
		}
		if (error instanceof z.ZodError) {
			console.log('🔥 [ERROR ZOD]', error.issues)
			const erros = error.issues.map(issue => issue.message)
			dataError.message = 'Erro de validação'
			return reply.status(400).send(responseFail(erros))
		}
		if (hasZodFastifySchemaValidationErrors(error)) {
			console.log('🔥 [ERROR ZOD FASTIFY]', error.validation)
			const erros = error.validation.map(issue => `${error.validationContext}${issue.instancePath} - ${issue.message}`)
			dataError.message = 'Erro de validação'
			return reply.status(400).send(responseFail(erros))
		}
	}
	console.log('🔥 [ERROR] Erro interno', error)
	return reply.status(500).send(responseFail([error.message || error.message || 'Erro interno'], null))
}
