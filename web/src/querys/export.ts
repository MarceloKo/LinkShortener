import { useMutation, } from "@tanstack/react-query"
import api from "../libs/axios"
import type { responseSuccessApi } from "../utils/response-api"
import ErrorAxios from "../utils/errorAxios"
import type { AxiosError } from "axios"

export const useMutationExportLinks = () => {
    return useMutation({
        mutationKey: ['EXPORT_LINKS'],
        mutationFn: async () => {
            return await api.get<responseSuccessApi<ExportLinksCsv>>('/export-links/csv').then((response) => {
                return response.data.response
            }).catch((error: AxiosError) => {
                throw new Error(ErrorAxios(error))
            })
        },
    })
}

interface ExportLinksCsv {
    fileUrl: string
}