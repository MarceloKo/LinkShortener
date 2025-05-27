import type { AxiosError } from 'axios'
import type { responseErrorApi } from './response-api'

export default function ErrorAxios<T>(error: AxiosError): string {
	const ErroAxios = error.response?.data as responseErrorApi<T>
	const listError = ErroAxios.errors

	return listError[0] || 'Ocorreu um erro inesperado.'
}
