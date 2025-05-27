import { useCallback, useEffect } from 'react'
import LinkNotFound from './not-found'
import LinkRedirecting from './redirecting'
import { useMutationLinkIncrementAccessCount, useQueryLinkFindByUrlShort } from '../../querys/links'

export default function PageLinkRedirect() {
    const urlShort = window.location.pathname.split('/').pop() || ''
    const { data, isLoading } = useQueryLinkFindByUrlShort(urlShort)
    const { mutate } = useMutationLinkIncrementAccessCount()



    const incrementAndRedirect = useCallback(() => {
        if (data?.urlDestination) {
            mutate(data.id, {
                onSuccess: () => {
                    window.location.href = data.urlDestination
                },
                onError: (error) => {
                    console.error('Error incrementing access count:', error)
                }
            })
        }
    }, [data, mutate])

    useEffect(() => {
        if (data?.urlDestination) {
            incrementAndRedirect()

        }
    }, [data, incrementAndRedirect])

    return (
        <div className="flex justify-center items-center h-screen px-5">
            <div className="flex items-center text-center justify-center rounded-lg bg-white w-full max-w-2xl h-max   md:p-20 px-5 py-20">
                {isLoading && <LinkRedirecting />}
                {!isLoading && data && <LinkRedirecting />}
                {!isLoading && !data && <LinkNotFound />}


            </div>
        </div>

    )
}