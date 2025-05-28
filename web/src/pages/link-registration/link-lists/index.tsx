import Hr from "../../../components/hr"
import Path from "./path"
import Button from "../../../components/button"
import { MdOutlineFileDownload } from "react-icons/md"
import Loading from "../../../components/loading"
import { useQueryLinksFindAll } from "../../../querys/links"
import { useMutationExportLinks } from "../../../querys/export"
import { toast } from "react-toastify"
import empty from '../../../assets/empty.svg'

export default function LinkLists() {
    const { data, isLoading } = useQueryLinksFindAll()
    const { mutate, isPending } = useMutationExportLinks()

    const exportToCSV = () => {
        mutate(undefined, {
            onSuccess: (response) => {
                const link = document.createElement("a");
                link.setAttribute("href", response.fileUrl);
                link.setAttribute("download", "links.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    }

    return (
        <div className="flex flex-col px-5 py-10 bg-white rounded-lg shadow-md flex-auto min-[500px]:px-10">
            <div className="flex justify-between items-center">
                <h2>Meus links</h2>
                <Button onClick={exportToCSV} disabled={isPending} loading={isPending} typeButton="secondary" icon={<MdOutlineFileDownload size={20} />}> Baixar CSV</Button>
            </div>
            <Hr />
            <div className="flex flex-col h-full overflow-y-scroll max-h-96">
                {isLoading && <Loading message="Buscando links" size={40} />}
                {!isLoading && data && data.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full gap-3">
                        <img src={empty} alt="Nenhum link encontrado" />
                        <p className="text-gray-500 uppercase text-xs">ainda não existem links cadastrados</p>
                    </div>
                )}
                {!isLoading && data && data.length > 0 && data?.map((link, index) => (
                    <div key={link.id} className={"animate-fade animate-once"} style={{ animationDelay: `${index * 30}ms` }}>
                        {index > 0 && <Hr />}
                        <Path data={link} />
                    </div>
                ))}
            </div>

        </div>
    )
}