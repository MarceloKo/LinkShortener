import { useEffect, useState } from "react"
import Hr from "../../../components/hr"
import Path from "./path"
import Button from "../../../components/button"
import { MdOutlineFileDownload } from "react-icons/md"
import Loading from "../../../components/loading"
import { useQuery } from "@tanstack/react-query"
import { useQueryLinksFindAll } from "../../../querys/links"

export default function LinkLists() {

    const { data, isLoading } = useQueryLinksFindAll()
    // const [links] = useState([
    //     { id: 1, urlShort: 'https://short.url/abc123', urlDestination: 'https://www.example.com/long-url-1', createdAt: new Date(), countAccess: 10 },
    //     { id: 2, urlShort: 'https://short.url/def456', urlDestination: 'https://www.example.com/long-url-2', createdAt: new Date(), countAccess: 5 },
    //     { id: 3, urlShort: 'https://short.url/ghi789', urlDestination: 'https://www.example.com/long-url-3', createdAt: new Date(), countAccess: 20 },
    //     { id: 4, urlShort: 'https://short.url/jkl012', urlDestination: 'https://www.example.com/long-url-4', createdAt: new Date(), countAccess: 15 },
    //     { id: 5, urlShort: 'https://short.url/mno345', urlDestination: 'https://www.example.com/long-url-5', createdAt: new Date(), countAccess: 8 },
    //     { id: 6, urlShort: 'https://short.url/pqr678', urlDestination: 'https://www.example.com/long-url-6', createdAt: new Date(), countAccess: 12 },
    //     { id: 7, urlShort: 'https://short.url/stu901', urlDestination: 'https://www.example.com/long-url-7', createdAt: new Date(), countAccess: 18 },
    //     { id: 8, urlShort: 'https://short.url/vwx234', urlDestination: 'https://www.example.com/long-url-8', createdAt: new Date(), countAccess: 25 },
    //     { id: 9, urlShort: 'https://short.url/yza567', urlDestination: 'https://www.example.com/long-url-9', createdAt: new Date(), countAccess: 30 },
    //     { id: 10, urlShort: 'https://short.url/bcd890', urlDestination: 'https://www.example.com/long-url-10', createdAt: new Date(), countAccess: 2 },
    // ])


    return (
        <div className="flex flex-col px-5 py-10 bg-white rounded-lg shadow-md flex-auto min-[500px]:px-10">
            <div className="flex justify-between items-center">
                <h2>Meus links</h2>
                <Button typeButton="secondary" icon={<MdOutlineFileDownload size={20} />}> Baixar CSV</Button>
            </div>
            <Hr />
            <div className="flex flex-col h-full overflow-y-scroll max-h-96">
                {isLoading ? <Loading message="Buscando links" size={40} /> : data?.map((link, index) => (
                    <div key={link.id} className={"animate-fade animate-once"} style={{ animationDelay: `${index * 30}ms` }}>
                        {index > 0 && <Hr />}
                        <Path data={link} />
                    </div>
                ))}
            </div>

        </div>
    )
}