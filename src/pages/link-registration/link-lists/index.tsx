import { useState } from "react"
import Hr from "../../../components/hr"
import Path from "./path"
import Button from "../../../components/button"
import { MdOutlineFileDownload } from "react-icons/md"

export default function LinkLists() {


    const [links] = useState([
        { id: 1, urlShort: 'https://short.url/abc123', urlDestination: 'https://www.example.com/long-url-1', createdAt: new Date(), countAccess: 10 },
        { id: 2, urlShort: 'https://short.url/def456', urlDestination: 'https://www.example.com/long-url-2', createdAt: new Date(), countAccess: 5 },
        { id: 3, urlShort: 'https://short.url/ghi789', urlDestination: 'https://www.example.com/long-url-3', createdAt: new Date(), countAccess: 20 },
        { id: 4, urlShort: 'https://short.url/jkl012', urlDestination: 'https://www.example.com/long-url-4', createdAt: new Date(), countAccess: 15 },
        { id: 5, urlShort: 'https://short.url/mno345', urlDestination: 'https://www.example.com/long-url-5', createdAt: new Date(), countAccess: 8 },
    ])

    return (
        <div className="flex flex-col px-5 py-10 bg-white rounded-lg shadow-md flex-auto min-[430px]:px-10">
            <div className="flex justify-between items-center">
                <h2>Meus links</h2>
                <Button typeButton="secondary"><MdOutlineFileDownload size={20} />  Baixar CSV</Button>
            </div>
            <Hr />
            <div className="flex flex-col">
                {links.map((link, index) => (
                    <div key={link.id}>
                        {index > 0 && <Hr />}
                        <Path data={link} />
                    </div>
                ))}
            </div>

        </div>
    )
}