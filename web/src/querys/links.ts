import { useQuery } from "@tanstack/react-query"
import api from "../libs/axios"
import type { responseSuccessApi } from "../utils/response-api"

export const useQueryLinksFindAll = () => {
    return useQuery({
        queryKey: ['GET_LINKS'],
        queryFn: async () => {
            return await api.get<responseSuccessApi<Link[]>>("/links").then((response) => {
                console.log(response.data)
                return response.data.response
            })
        }
    })
}




interface Link {
    id: string;
    urlShort: string;
    urlDestination: string;
    countAccess: number;
}