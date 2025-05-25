import { FiCopy } from "react-icons/fi";
import Button from "../../../../components/button";
import { RiDeleteBin3Line } from "react-icons/ri";
type PathProps = {
    urlShort: string;
    urlDestination: string;
    countAccess: number;
}
export default function Path({ data }: { data: PathProps }) {
    const { urlShort, urlDestination, countAccess } = data;
    return (
        <div className="flex justify-between items-center">
            <div>
                <a className="text-blue-700 font-semibold ">{urlShort}</a>
                <p className="text-gray-500 line-clamp-1">{urlDestination}</p>
            </div>
            <div className="flex items-center gap-5 justify-end">
                <p className="text-gray-500 text-center">{countAccess} acessos</p>
                <div className="flex gap-2 flex-wrap justify-end w-min md:w-auto md:flex-nowrap">
                    <Button typeButton="secondary"><FiCopy size={20} /></Button>
                    <Button typeButton="secondary"><RiDeleteBin3Line size={20} /></Button>
                </div>
            </div>
        </div>
    )
}