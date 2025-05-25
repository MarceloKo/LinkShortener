import { responseFail } from '@/utils/api-response'
import { PrismaService } from '@prisma/prisma-service'
import type { FastifyReply, FastifyRequest } from 'fastify'

declare module 'fastify' {
	interface FastifyRequest {
		projectId: string
	}
}

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
	try {
		const clientId = (req.headers.clientId || req.headers.clientid) as string
		const clientSecret = (req.headers.clientSecret || req.headers.clientsecret) as string

		if (!clientId) {
			return reply.status(401).send(responseFail('Parâmetro clientId não informado!', null, 401))
		}
		if (!clientSecret) {
			return reply.status(401).send(responseFail('Parâmetro clientSecret não informado!', null, 401))
		}

		try {
			const project = await PrismaService.project.findUnique({
				where: { clientId, clientSecret },
			})

			if (!project) {
				return reply.status(401).send(responseFail('Credenciais inválidas!', null, 401))
			}
			req.projectId = project.id
		} catch (_error) {
			return reply.status(401).send(responseFail('Credenciais inválidas!', null, 401))
		}
	} catch {
		return reply.status(401).send(responseFail('Credenciais inválidas!', null, 401))
	}
}
