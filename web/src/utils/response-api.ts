export type responseSuccessApi<T> = {
	message: string
	response: T
}
export type responseErrorApi<T> = {
	errors: Array<string>
	response: T
}
