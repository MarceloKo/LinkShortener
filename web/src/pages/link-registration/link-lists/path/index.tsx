import { FiCopy } from "react-icons/fi";
import Button from "../../../../components/button";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useMutationDeleteLinkById, type Link } from "../../../../querys/links";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
type PathProps = {
    urlShort: string;
    urlDestination: string;
    countAccess: number;
    id: string;
}
export default function Path({ data }: { data: PathProps }) {
    const { urlShort, urlDestination, countAccess, id } = data;
    const { mutate, isPending } = useMutationDeleteLinkById()
    const urlWithDomain = new URL(urlShort, window.location.origin);

    const queryCliente = useQueryClient()

    const handleDelete = () => {
        mutate({ id }, {
            onSuccess: () => {
                queryCliente.setQueryData(['GET_LINKS'], (oldData: Link[]) => {
                    if (oldData) {
                        return oldData.filter((link: PathProps) => link.id !== id);
                    }
                    return [];
                })
            }
        })
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(urlWithDomain.href)
        toast.info('O link foi copiado para a área de transferência.', {
            autoClose: 1000,
            toastId: `copy-link-toast-${id}`,
        })
    }


    return (
        <div className="flex justify-between items-center">
            <div className="max-w-[150px] sm:max-w-[250px] lg:max-w-[300px] ">
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={urlWithDomain.href}
                    className="text-blue-700 font-semibold truncate block"
                    title={urlWithDomain.href}
                >
                    {urlWithDomain.href.replace(`${urlWithDomain.protocol}//`, '')}
                </a>
                <p className="text-gray-500 truncate block">{urlDestination}</p>
            </div>
            <div className="flex items-center gap-2 justify-end md:gap-5">
                <p className="text-gray-500 text-center">{countAccess} acessos</p>
                <div className="flex gap-2 flex-wrap justify-end w-min md:w-auto md:flex-nowrap">
                    <Button typeButton="secondary" icon={<FiCopy size={20} />} onClick={handleCopy} />
                    <Button disabled={isPending} loading={isPending} typeButton="secondary" onClick={() => handleDelete()} icon={<RiDeleteBin3Line size={20} />} />
                </div>
            </div>
        </div>
    )
}