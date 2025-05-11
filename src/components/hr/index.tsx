import { twMerge } from "tailwind-merge";


interface HrProps {
    className?: string;
}
export default function Hr({ className }: HrProps) {
    return (
        <hr className={twMerge("border-t border-gray-300 my-5", className)} />
    )
}