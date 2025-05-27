import { useMutation, useQuery } from "@tanstack/react-query"
import api from "../libs/axios"
import type { responseSuccessApi } from "../utils/response-api"
import type { LinkFormData } from "../pages/link-registration/link-create/schemas/create-schema"
import type { AxiosError } from "axios"
import ErrorAxios from "../utils/errorAxios"

export const useQueryLinksFindAll = () => {
    return useQuery({
        queryKey: ['GET_LINKS'],
        queryFn: async () => {
            return await api.get<responseSuccessApi<Link[]>>("/link").then((response) => {
                return response.data.response
            })
        }
    })
}

export const useQueryLinkFindByUrlShort = (urlShort: string) => {
    return useQuery({
        queryKey: ['GET_LINK_FIND_BY_URL_SHORT', urlShort],
        queryFn: async () => {
            return await api.get<responseSuccessApi<Link>>(`/link/url-short/${urlShort}`).then((response) => {
                return response.data.response
            })
        }
    })
}

export const useQueryLinkFindByShortUrl = (shortUrl: string) => {
    return useQuery({
        queryKey: ['GET_LINK_FIND_BY_SHORT_URL', shortUrl],
        queryFn: async () => {
            return await api.get<responseSuccessApi<Link>>(`/link/url-short/${shortUrl}`).then((response) => {
                return response.data.response
            })
        }
    })
}

export const useMutationLinkIncrementAccessCount = () => {
    return useMutation({
        mutationKey: ['PUT_LINK_INCREMENT_ACCESS_COUNT'],
        mutationFn: async (id: string) => {
            return await api.post<responseSuccessApi<Link>>(`/link/${id}/increment-access`).then((response) => {
                return response.data.response
            }).catch((error: AxiosError): string => {
                throw new Error(ErrorAxios(error))
            })
        }
    })
}


export const useMutationDeleteLinkById = () => {
    return useMutation({
        mutationKey: ['DELETE_LINK_BY_ID'],
        mutationFn: async ({ id }: { id: string }) => {
            return await api.delete<responseSuccessApi<Link>>(`/link/${id}`).then((response) => {
                return response.data.response
            }).catch((error: AxiosError): string => {
                throw new Error(ErrorAxios(error))
            })
        },
    })
}

export const useMutationLinkCreate = () => {
    return useMutation({
        mutationKey: ['POST_LINK_CREATE'],
        mutationFn: async (data: LinkFormData) => {
            return await api.post<responseSuccessApi<Link>>('/link', data).then((response) => {
                return response.data.response
            }).catch((error: AxiosError): string => {
                throw new Error(ErrorAxios(error))
            })
        },
    })
}






export interface Link {
    id: string;
    urlShort: string;
    urlDestination: string;
    countAccess: number;
}

