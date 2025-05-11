import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface LoadingProps {
    size: number;
    message?: string;
}
export default function Loading({ message, size = 40 }: LoadingProps) {
    return (
        <div className="flex flex-col m-auto justify-center items-center gap-2">
            <AiOutlineLoading3Quarters className="animate-spin text-blue-700 " size={size} />
            {message && <p className="text-center text-gray-500">{message}</p>}
        </div>
    )
}