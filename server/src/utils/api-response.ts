import { z } from 'zod'

export const apiResponseSuccess = z
  .object({
    response: z.any().nullable().default(null),
    message: z.string(),
  })
  .describe('Requisição processada com sucesso')

export const apiResponseFail = z
  .object({
    response: z.any().nullable().default(null),
    errors: z.array(z.string()).default([]),
  })
  .describe('Ocorreu um erro ao processar a requisição')

export type ApiResponseSuccess = z.infer<typeof apiResponseSuccess>
export type ApiResponseFail = z.infer<typeof apiResponseFail>

export function responseSuccess<T>(message: string, response: T): { message: string; response: T } {
  return {
    message,
    response,
  }
}
export function responseFail<T>(errors: string[] | string = [], response: T | null = null): ApiResponseFail {
  const normalizedErrors = Array.isArray(errors) ? errors : [errors]
  return {
    response,
    errors: normalizedErrors,
  }
}
