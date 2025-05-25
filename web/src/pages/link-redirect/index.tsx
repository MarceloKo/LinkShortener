import { useEffect, useState } from 'react'
import LinkNotFound from './not-found'
import LinkRedirecting from './redirecting'

export default function PageLinkRedirect() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000)
    }, [])

    return (
        <div className="flex justify-center items-center h-screen px-5">
            <div className="flex items-center text-center justify-center rounded-lg bg-white w-full max-w-2xl h-max   md:p-20 px-5 py-20">
                {loading ? <LinkRedirecting /> : <LinkNotFound />}
            </div>
        </div>

    )
}