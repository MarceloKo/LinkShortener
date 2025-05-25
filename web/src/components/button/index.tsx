import { twMerge } from "tailwind-merge";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


type ButtonType = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    typeButton?: ButtonType;
    loading?: boolean;
    icon?: React.ReactNode;
}
export default function Button({ children, loading, icon, typeButton = 'primary', ...props }: ButtonProps) {
    const defaultStyle = 'flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold cursor-pointer transition-colors duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 ';
    const classnameByType: Record<ButtonType, string> = {
        primary: 'bg-blue-700 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
        tertiary: 'bg-transparent text-blue-500 hover:bg-blue-100'
    }


    return (
        <button disabled={loading || props.disabled} className={twMerge(defaultStyle, classnameByType[typeButton], props.className)}  {...props}>
            {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
            {!loading && icon && <span>{icon}</span>}
            {children}
        </button>
    )
}